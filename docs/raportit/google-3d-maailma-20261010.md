# Googlen 3D-laatat maailman suurissa kaupungeissa (Linssiseppä 2, 10.10.2026)

Omistajan kysymys (PT 10.1x): "Kerro koko maailman suuret tai tärkeät kaupungit mistä ei ole hyvää Googlen 3d dataa". Pelkkä mittaus (VAIN EUROOPPA pysyy), Euroopan ulkopuolella 138 kaupunkia.

**Menetelmä** (sama sääntö kuin Euroopan sallitut-3d 7.10., `tools/pollo/sallitut.js`): Google Photorealistic 3D Tiles (Cesium ion 2275207). Jokaisessa pisteessä haetaan syvin laatta ja mitataan sen kolmioiden mediaanireuna. Tarkka ≤ 1,7 m (oikea fotogrammetrinen 3D), keskitaso ≤ 5 m, karkea > 5 m, vesi ≥ 12 m (ei lasketa). Kynnykset kalibroitu Euroopan luokilla: Pariisi ja Košice 1,2–1,6 m (SALLITTU), Tromssa 1,5–2,4 m ja Kiova 2,5–5 m (RAJA), Minsk 8–19 m ja Moskova 4–13 m (POIS). Keskusta = 17 pistettä 0–500 m.

- **HYVÄ (SALLITTU)**: keskustasta tarkkoja ≥ 50 % ja hyvä myös 1–5 km renkailla (PT 10.1x: 5 km riittää; ensimmäiset 7 USA:n kaupunkia mitattiin 20 km:iin).
- **RAJA**: keskustasta tarkkoja ≥ 20 % tai keskitasoa ≥ 40 % (osittainen tai vanha 3D).
- **POIS**: ei hyvää 3D:tä (vain maasto ja karkeat talot).

Sarake "reuna" = keskustan mediaanireuna (pienempi = tarkempi).

**Tulkinta:** suuri osa RAJA-kaupungeista on Googlen yleistasoa (keskustan reuna 4,5–8 m, ei fotogrammetriaa), eli käytännössä ilman hyvää 3D:tä: Santo Domingo, Bogotá, Caracas, Quito, Montevideo, Asunción, Medellín, Cusco, Shenzhen, Guangzhou, Pjongjang, Kuala Lumpur, Phnom Penh, Naypyidaw, Dhaka, New Delhi, Mumbai, Bengaluru, Kalkutta, Chennai, Colombo, Islamabad, Lahore, Mekka, Masqat, Beirut, Damaskos, Tbilisi, Jerevan, Abuja, Kinshasa, Nairobi, Addis Abeba, Dar es Salaam, Accra, Abidjan, Luanda, Kampala, Maputo, Port Moresby, Suva. Aitoa osittaista 3D:tä (reuna < 4,5 m) on vain: La Paz, Shanghai, Hongkong, Singapore, Amman, Jerusalem, Ankara, Alger, Kigali.

**Yhteensä:** HYVÄ 38, RAJA 50, POIS 50.

## Aasia

**Ei hyvää 3D:tä (POIS):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Soul | 0 % | 24 % | 7.4 m |
| Busan | 0 % | 36 % | 5.9 m |
| Peking | 0 % | 7 % | 7.1 m |
| Ulan Bator | 0 % | 6 % | 9.4 m |
| Bangkok | 0 % | 12 % | 6.8 m |
| Jakarta | 7 % | 20 % | 7.0 m |
| Manila | 0 % | 29 % | 5.2 m |
| Hanoi | 6 % | 19 % | 6.6 m |
| Ho Chi Minh | 0 % | 20 % | 7.1 m |
| Vientiane | 0 % | 31 % | 6.8 m |
| Yangon | 0 % | 0 % | 9.6 m |
| Kathmandu | 0 % | 13 % | 7.1 m |
| Karachi | 0 % | 24 % | 6.6 m |
| Kabul | 0 % | 27 % | 7.1 m |
| Teheran | 0 % | 0 % | 10.0 m |
| Bagdad | 0 % | 19 % | 6.0 m |
| Riad | 0 % | 12 % | 6.6 m |
| Jidda | 0 % | 8 % | 8.8 m |
| Dubai | 0 % | 20 % | 6.7 m |
| Abu Dhabi | 0 % | 12 % | 7.2 m |
| Doha | 0 % | 6 % | 7.2 m |
| Kuwait | 0 % | 12 % | 7.4 m |
| Manama | 0 % | 6 % | 8.2 m |
| Sanaa | 0 % | 24 % | 7.1 m |
| Tel Aviv | 0 % | 0 % | 11.4 m |
| Baku | 0 % | 6 % | 7.1 m |
| Taškent | 0 % | 25 % | 5.7 m |
| Samarkand | 0 % | 6 % | 7.1 m |
| Astana | 0 % | 7 % | 7.4 m |
| Almaty | 6 % | 24 % | 5.3 m |
| Biškek | 0 % | 6 % | 7.1 m |
| Dušanbe | 6 % | 18 % | 7.1 m |
| Ašgabat | 0 % | 18 % | 5.7 m |

**Rajatapaukset (RAJA):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Shanghai | 0 % | 65 % | 4.3 m |
| Hongkong | 47 % | 53 % | 1.7 m |
| Shenzhen | 6 % | 76 % | 4.6 m |
| Guangzhou | 0 % | 75 % | 4.5 m |
| Pjongjang | 7 % | 40 % | 5.2 m |
| Singapore | 38 % | 25 % | 3.5 m |
| Kuala Lumpur | 0 % | 59 % | 4.8 m |
| Phnom Penh | 6 % | 44 % | 5.1 m |
| Naypyidaw | 0 % | 53 % | 4.8 m |
| Dhaka | 8 % | 46 % | 4.8 m |
| New Delhi | 0 % | 65 % | 4.8 m |
| Mumbai | 0 % | 54 % | 4.8 m |
| Bengaluru | 0 % | 53 % | 4.9 m |
| Kalkutta | 0 % | 53 % | 4.7 m |
| Chennai | 0 % | 53 % | 4.9 m |
| Colombo | 0 % | 92 % | 4.8 m |
| Islamabad | 0 % | 59 % | 4.8 m |
| Lahore | 0 % | 47 % | 5.0 m |
| Mekka | 0 % | 47 % | 5.1 m |
| Masqat | 0 % | 44 % | 8.0 m |
| Amman | 0 % | 76 % | 3.1 m |
| Jerusalem | 0 % | 82 % | 2.9 m |
| Beirut | 0 % | 76 % | 4.8 m |
| Damaskos | 0 % | 41 % | 5.2 m |
| Ankara | 0 % | 88 % | 3.9 m |
| Tbilisi | 0 % | 65 % | 4.8 m |
| Jerevan | 0 % | 53 % | 4.8 m |

**Hyvä 3D:** Tokio, Osaka, Kioto, Taipei.

## Afrikka

**Ei hyvää 3D:tä (POIS):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Kairo | 0 % | 20 % | 6.2 m |
| Lagos | 0 % | 29 % | 7.1 m |
| Casablanca | 12 % | 29 % | 5.9 m |
| Rabat | 0 % | 0 % | 7.9 m |
| Marrakesh | 0 % | 12 % | 9.5 m |
| Tripoli | 0 % | 12 % | 7.4 m |
| Khartum | 0 % | 6 % | 7.1 m |
| Dakar | 0 % | 6 % | 7.2 m |
| Harare | 0 % | 12 % | 7.3 m |
| Antananarivo | 0 % | 24 % | 6.8 m |
| Bamako | 0 % | 6 % | 9.4 m |

**Rajatapaukset (RAJA):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Abuja | 0 % | 65 % | 4.8 m |
| Kinshasa | 0 % | 47 % | 5.1 m |
| Nairobi | 0 % | 53 % | 4.8 m |
| Addis Abeba | 0 % | 71 % | 4.8 m |
| Dar es Salaam | 6 % | 41 % | 5.1 m |
| Alger | 0 % | 71 % | 3.9 m |
| Accra | 0 % | 44 % | 5.1 m |
| Abidjan | 0 % | 47 % | 5.1 m |
| Luanda | 0 % | 76 % | 4.8 m |
| Kampala | 0 % | 76 % | 4.8 m |
| Kigali | 12 % | 82 % | 3.9 m |
| Maputo | 6 % | 44 % | 5.1 m |

**Hyvä 3D:** Johannesburg, Kapkaupunki, Pretoria, Tunis.

## Etelä-Amerikka

**Ei hyvää 3D:tä (POIS):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Lima | 0 % | 18 % | 6.7 m |

**Rajatapaukset (RAJA):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Bogotá | 0 % | 53 % | 4.9 m |
| Caracas | 0 % | 65 % | 4.8 m |
| Quito | 0 % | 65 % | 4.8 m |
| La Paz | 6 % | 94 % | 2.7 m |
| Montevideo | 0 % | 47 % | 5.1 m |
| Asunción | 0 % | 71 % | 4.8 m |
| Medellín | 0 % | 53 % | 4.8 m |
| Cusco | 6 % | 59 % | 4.8 m |

**Hyvä 3D:** São Paulo, Rio de Janeiro, Brasília, Buenos Aires, Santiago.

## Pohjois-Amerikka

**Ei hyvää 3D:tä (POIS):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Havanna | 6 % | 24 % | 6.6 m |
| Panamá | 0 % | 35 % | 5.3 m |
| Guatemala | 0 % | 35 % | 7.1 m |
| San José | 0 % | 18 % | 7.0 m |
| Kingston | 0 % | 12 % | 7.1 m |

**Rajatapaukset (RAJA):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Santo Domingo | 0 % | 40 % | 6.5 m |

**Hyvä 3D:** Washington, New York, Los Angeles, Chicago, San Francisco, Houston, Miami, Boston, Seattle, Las Vegas, New Orleans, Ottawa, Toronto, Montréal, Vancouver, Méxiko, Guadalajara.

## Oseania

**Rajatapaukset (RAJA):**

| kaupunki | keskusta tarkka | keskitaso | reuna |
|---|---|---|---|
| Port Moresby | 0 % | 82 % | 4.7 m |
| Suva | 0 % | 65 % | 4.8 m |

**Hyvä 3D:** Canberra, Sydney, Melbourne, Brisbane, Perth, Wellington, Auckland, Honolulu.

Aineisto ja skriptit: `proto-3d/_tyo/linssiseppa2/google3d-maailma/` (mittaa.py, reunat.mjs, tulos*.jsonl).
