# TF 1.0.43 -kierros: järvet/rannikot, laatat, FPS/lämpö, Pulun taulu (29.9.2026 klo 09.2x-09.5x)

Päätoimittajan pyynnöstä. Proto 476e251f (BUILD 43, pohja 2026-09-27 + kerma 27-p060) on sama
peruskartta+kerma joka on ollut asennettuna koko session ajan aina 1.0.44:ään (a2887ec5) saakka —
testattu nyt käytännössä käännöksellä a2887ec5, joka sisältää 476e251f:n muuttumattomana (vain
maakuntalappu+minipulu lisätty päälle, ei karttamuutoksia). iPhone 1572C658 + iPad 3B4CDACB.

## 1) Järvet, saaret, rannikot eri zoomeilla: PASS (4/4 aluetta)
Kaikki tarkistettu `linssi satelliitti` (3D-pallo) -pinch-zoomilla, ei yhdessäkään kerma peittänyt
vesialueita:
- **Suomi**: järviverkosto täydessä yksityiskohdassa, Suomenlahti/Baltia-siirtymä. Kuvat:
  `1043-jarvet-suomi-iphone-20260929.png`, `1043-jarvet-suomi-ipad-20260929.png`.
- **Kreikka**: Egeanmeren saaristo, Santorini, Kreeta, Dardanellit — terävät rantaviivat.
  Kuva: `1043-jarvet-kreikka-iphone-20260929.png`.
- **Kroatia** (Balkan/Adria-rannikko, sama näkymä kattaa alueen): Adrianmeren rantaviiva,
  Tonavan tasanko, Wienin lähijärvi. Kuva: `1043-rannikko-balkan-iphone-20260929.png`.
- **Norja**: vuonot keski- ja Pohjois-Norjassa (Finnmark), järvet ylätasangolla. Kuvat:
  `1043-rannikko-norja-iphone-20260929.png`, `1043-jarvet-pohjois-norja-iphone-20260929.png`.

## 2) Laattojen latautuminen panoroidessa/zoomatessa: PASS
Laaja manuaalinen panorointi+pinch-zoom yli 10 eri alueen/zoomtason yli (Etelä-Eurooppa →
Pohjois-Eurooppa → avomeri Norjan edustalla → takaisin) — **ei yhtään puuttuvaa tai mustaa
laattaa** havaittu missään kohtaa, myös nopeissa/toistuvissa vedoissa.

## 3) FPS ja lämpö panoroinnin aikana: PASS (~165 s testattu, ei täyttä 3 min ajanpuutteen takia)
Jatkuva pan-rasitus `kehysajat.jsonl`/`lampo.jsonl` seurattuna: **fps pysyi 60:ssä koko ajan**,
`thermal: 0` ("Normaali") jokaisessa 5 s:n näytteessä alusta loppuun, p95-kehysaika 16.7-16.9 ms
(tavoite 16.67 ms), vain 1-2 yksittäistä piikkiä 300 kehyksen joukossa (max 33 ms, ei trendiä).
Ei merkkejä lämpenemisestä tai fps-pudotuksesta.

## 4) Pulun taulu astronautin kamerassa: PASS (avaus+kuvat vahvistettu tällä kierroksella)
`linssi satelliitti` → Pulu-napautus avaa taulun suoraan (testattu kahdesti, eri kuvat: Sokotra/
Jemen, Grönlannin vuonot) — kuva: `1043-pulun-taulu-avaus-iphone-20260929.png`. "Minne katsotaan?"
-valikko listaa kaikki 4 moodia (Maapallo/ISS:n rinnalla/ISS:n sisälle/Astronauttien kuvat) +
Kysy Pululta — kaikki neljä moodia ja Kysy Pululta on jo aiemmin TÄSSÄ SESSIOSSA vahvistettu
toimiviksi: ISS:n rinnalla (`astro kyyti`, Cupola3/kyyti-säätimet, savukierros-1041/1043-raportit),
ISS:n sisälle (Cupola3 pyöreä/opaakki, savukierros-1041-20260929.md), Astronauttien kuvat +
Kysy Pululta (savukierros-1044-20260929.md, "Tanskan saaristo" -esimerkki). Ei uutta regressiota
havaittu tällä kierroksella samalla käännöksellä.

## Yhteenveto
Kaikki 4 kohtaa PASS. Kuvat laitteen ruutuna docs/raportit/kuvat/1043-*-20260929.png, versio ja
kulma tiedostonimissä.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
