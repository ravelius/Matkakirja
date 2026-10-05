# BUILD 142 uusinta: linnan 360° suljettu, zoom, radio, kuvakatselin, rantametsä — 5.10.2026 klo 11.19–11.24

Laitetestaaja (Sonnet 5.5, high). iPhone 18 Pro 1572C658, `juna-1.1.142-b42c04de`, linnan osoitin 2296811421200485.
Natiivi-UI käänsi samaan aikaan: toimintatesti, ei fps- eikä laatumittausta. Konsoliloki `kuvat/peli-loki-142-360b.txt`
(2294 riviä), **0 Exception**. Simu 1572C658 sammutettu 11.24. Korvaa `savukierros-142-linna360-20261005.md` (osittainen).

## 1) Linnan 360° — PASS (kierros sulkeutuu)
Avaus: `linssi poikkileikkaus` + `poikki orbit 0`; kertoja oli jo ohi ("kerronta ohi"). Neljä samansuuntaista vetoa
(touch_path, 200 pt portrait-y = vaakaveto, 5 pistettä), `poikki mittaus` jokaisen jälkeen:

| Vaihe | Kameran paikka (x, y, z) | Kulma keskuksen (9,5; 3,9) ympäri |
|---|---|---|
| alku | 40,3 / 70,8 / −111,2 | 165,0° |
| veto 1 | 124,9 / 70,8 / 33,5 | 75,6° (−89,4°) |
| veto 2 | −23,3 / 70,8 / 118,5 | −16,0° (−91,6°) |
| veto 4 (loppu) | 38,1 / 70,8 / −111,8 | ≈ alku (ero ~1°, 2,3 yks. säteellä 119) |

Korkeus pysyy 70,8, säde 119,2 vakiona (ympyrä sovitettu kolmeen pisteeseen). ~90° per 200 pt, kierros sulkeutuu: loppu
= alkuasento. Stillit: `linna-360-0-alku`, `-2-veto2-180`, `-3-veto3-270`, `-4-veto4-loppu` (… -142-20261005.png).
Vedon 1 ja 3 still puuttuu (otettu vain 180°, 270° ja loppu).
Huom: linna näkyy simussa yhä 90° kierrettynä pystyruudulla (= 1141 kohta 1; simun kierto, ei fyysistä laitetta).

## 2) Zoom (1141 kohta 2) — PASS
Nipistys auki (touch2_path): nimilaput **3 → 5** (Fatabuuri, Keittiö, Kappeli → + Keskushalli, Muurinharja), loki
`poikki: nimilaput 5/6`, kamera lähemmäs (z −111 → −83, y 70,8 → 53,6). Still `linna-zoom-5laputa-142-20261005.png`.

## 3) Rantametsä 1475-näkymässä (osoitin 22968114) — PASS (silmämääräinen)
`poikki kamera 200 7 260` (matala): rantametsä on yhtenäistä latvustoa, yksittäisiä puita; pystyraitoja ei näy.
Still `linna-rantametsa-1475-22968114-20261005.png`. Arvio silmällä, kuva kierrettynä; ei mitattu.

## 4) 30488e2b:n loput (osa)
- **Radio** — PASS (ilman ääntä-arviota): `linssi radio` avautuu 0,4 s, VU-mittari + näyttö + kaista (Madrid…Vatikaani),
  napautus Monaco → "MONACO 98.2", kartta keskittyy, 0 virhettä (`radio-alku`, `radio-monaco`). **Huom:** viritys
  käynnisti oikean streamin (`radio: Soi MCO`) ja sulkeminen `radio: Hiljaa` muutaman sekunnin kuluttua — ääni meni
  pelin ulostuloon; ääntä en mitannut enkä todentanut.
- **Pulun taulu / ISS-valikko** — PASS (pystynä): "Minne katsotaan?" Maapallo / Astronauttien kuvat / ISS-ohjaamo / Poistu.
- **Kuvakatselin** — PASS: Astronauttien kuvat avaa Etelän revontulet -kuvan, ‹ › ja AUTO näkyvät, iso kuva purettu
  1260×2732, selite luetaan (astro-selite 233 mrk). **Huom:** selite alkoi puhua oletusulostuloon ennen kuin ehdin
  `puhe pois` -komennolle (muutaman sekunnin, ei mitattu).
- Kuvat: `pulun-taulu-142`, `kuvakatselin-142` (… -20261005.png).

## EI TESTATTU
Laituri-kamera (jousi), huoneet-valikko 7/7 uudella 142:lla, Mylly (Poistu/äänet/voitto-häviö), ISS-taulu vaaka,
Jatka matkaa, lukijalista, ääniraidallinen tallenne, dB-mittaus, Kreikka/Ateena-kortti. Syy: 20 min vuoro.
ISS-POISTU 10 tapin testi kuuluu fyysiselle iPadille (00008103).

## Menetelmä
Peli ilman introa: `printf 'odota-tila Aloitus 40\nuusi-peli 5 marseille\nodota-tila Kartta 40' > peli-komento.txt`.
Linna: `kehittaja 1`, `poikki orbit 0`, `linssi poikkileikkaus` (linssi-komento.txt). Linssit: `linssi radio|satelliitti`.
Taulu: `ui linssi taulu auki`. Kulma kolmesta `poikki mittaus` -pisteestä (ympyrän sovitus).
