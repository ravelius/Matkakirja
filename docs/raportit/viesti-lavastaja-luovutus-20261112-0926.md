# Lavastaja: luovutus 12.11.2026 klo 09.26 (konteksti 26 %, pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261112-0858.md (88374c1ab) – sen LEIVONTA V5- ja PALA 3.1b -osat ovat yhä voimassa.
Id:t: KK local_d5f31591, JU local_2a7d6c96, PK local_d3bb1f78, NS local_0f7f169f, Postivahti local_1f31f830.
A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/a2-nyt (kaikki työkalut, lokit ja parit täällä).

## TEHTY: tausta-v133d (KK:N JUNASANA 09.24)
- A/tee_a2.py v133c → A/v133d → paketti _valmiit/juoksupeli-kk-lavastaja-tausta-v133d-vienti-20261112 (SHA256SUMS b2bd622e8ad0).
  K1 kivireunuksen alareuna y −0,02; K2 itämuuri kokonaan ruutuun 3-3; K3 2-2:n ikkunalautajäänteet pois; K4 1-3:n lattiareikä paikattu.
- Mac-pari (JU, 09.17): A/kuvat-v133d, parit A/parit-v133d, tulos A/TULOS.txt. HUOM: 67092d8d5 ei tunne komentoa `palatsi korvaa` → käytä 9a78cd26b:tä.
- Paketti JU:lle vientiin; PK:lle viesti TaustaKansio v133c → v133d + kulkukartta. Kuittauksia ei vielä tullut → tarkista.

## KÄRKI: KK 09.24 jatkokohdat (v134:n eli v5:n työhön, samat parit näytöksi)
Syyt lähetetty KK:lle (viestin aikaleima oli väärin "09.4x", todellinen noin 09.2x):
- 1a a34: sokkelinauhan (V4_kujakivi_sokkeli) viuhka alkaa kulmasta sisempää (358,19 → 357,48) → kulmakolmio puuttuu → vino alakulma.
  Määrä koko taustassa: A/sokkelikulmat.py → A/sokkelikulmat-v133d.txt (noin 2 300 aukkoa > 0,2 m).
- 1b a41 (myös a34:n pääty x 358,2): päätyseinillä ei ole sokkelia lainkaan. A/sokkelittomat.py → A/sokkelittomat-v133d.txt (noin 2 700 alareunaa, noin 27 km).
  KK:N SANA PUUTTUU: lisätäänkö sokkeli vain päätyihin (kulmanaapurilla on sokkeli) vai kaikkiin seiniin. Ei tehdä ennen sanaa.
- 3 a41:n vaalea kaistale: koholattia y 0,44 (2-3) päättyy vinoon reunaan (116,67; 208,33)–(123,21; 222,69), vieressä lattia y 0 eikä pystypintaa
  → 0,44 m:n raosta näkyy alempi maataso. Kameramalli todennettu (mika-osumat täsmäävät): kamera, yaw 180 → kuvan vasen = +x, fov 70 pysty, 4:3.
- 2 sininen koholattia (a34, a20): poistuu leivonnassa, näytetään v5-parissa.
- TEKEILLÄ: A/tee_a3.py (S1 = 1a:n kulmakolmiot, R1 = 3:n koholattian reunoille kivireunuksen pystypinta y −0,02:een, vain lod0).
  Kuivaajo v133d:llä käynnistetty 09.26 → A/tee_a3-kuiva.log (määrät ruuduittain). EI VIELÄ TESTATTU: tarkista loki, määrien järkevyys
  (R1 ei saa tehdä pintoja ruutujen rajoille eikä portaisiin), sitten ajo v133d:n kopioon A/v133e → aja-v133d.zsh-tyyppinen pari
  (sk-v133d.txt, korvaa-polku v133e, sha 9a78cd26b) → parit KK:lle. v134:ään vasta v5-paketin jälkeen (tee_a2 + tee_a3).

## Avoimet havainnot (ei korjattu)
- Viuhkamuurit 0-2/0-3 (länsi) ja 0-4/1-4 lod0 (pohjoinen): sama puolikasvika mahdollinen, mutta kolmiointi ei ole puhdas suorakaide (tee_a2:n K2 ohitti).
- Ikkunalautajäänteitä (vaaka V4_ikkunakehys) on muissakin ruuduissa (A/lautakysely.py); yleissääntöä ei ole, koska aidot kehykset osuvat samaan.
