# Lavastaja: luovutus 11.11.2026 klo 10.31 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-0925.md (haara lavastaja/luovutus-20261111-0925). Työpolut juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu 09.38–10.30). JU local_2a7d6c96, PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591, NS local_0f7f169f, Postivahti local_1f31f830. Kellonajat `date`:lla.

## Koejuuri katot-v125/koejuuri-m1 (ÄLÄ aja samoja skriptejä uudelleen)
Edellisten lisäksi ajettu (muuri/m1/): tee_ikkuna.py (09.38, 2044 ristiin kolmioitua V4_ikkunakehys-vaakakolmiota pois lod0, 19 ruutua;
--kuiva nyt 0), tee_a2.py (10.2x, kansikolmio pois jos keskipiste > 0,15 m sokkelin sivun ulkopuolella, vain kohteiden 16 m: a22 3, a34 3, a35 6;
--kaikki EI käyttökelpoinen: 21 242).
UUDET LINKIT koejuuri-penger2:ssa ja -m1:ssä: kielletty-tausta-v132 -> ./kielletty-tausta-v129, kielletty-rakennukset-v127, kielletty-lahipuut-v17.
PT 10.3x: v133-parit ajetaan sha:lla 060fa6ac8 (lataa tausta-v132-nimen, rakennukset-v127, lahipuut-v17). Vanha b804a87d6 lataa lahipuut-v15
-> ruudun 1-1 puut puuttuvat (EI vika; PT kuittasi).

## KK:n tila (10.2x)
HYVÄKSYTTY v133:een: M1, E4, E1 (kaistale poissa), M4 (ikkunalautalevy), ik-1-3, ik-2-3 (parit m1/pari-i-*.jpg).
Huomiot jonoon (eivät estä v133): ik-2-3 katon harjan punainen viiva = taustan harjasauma (LAV:n kattotyö); ik-1-3 seinän haaleat
suorakaiteet = vanha leivottu valo (uusintaleivonta korjaa). ik-2-3 vasemman alakulman kiila = seinän kulma, ei kohta (KK:lle kerrottu).

## AVOIN v133: aja-a2 (JU 10.29) kuvat m1/kuvat-a2-{penger2,m1}, arkki m1/a2-arkki-1400px/, mika unity.log:ssa
- a22 EI KORJAUTUNUT: m1:ssä yhä vino harmaa kiila kujalla (m1/pari-a2-a22-vino.jpg). Syy: tee_a siirsi kärkiä sokkelin sivuille → jäljelle jäi
  kolmio, jonka keskipiste on sokkelin sisällä. Korjaus: 3-1 rakennukset.028 V4_kujakivi_sokkeli_yla -kolmiot, joiden JOKIN kärki tai särmän
  keskipiste on > 0,15 m sivun ulkopuolella (sama ulkona()-testi, tee_a2.py) TAI palauta kansi v132:sta (koejuuri-penger2) ja aja tee_a2-testi.
- KATSOMATTA: a34, a35, a20, a41, a36 (a36 = V4_kivireunus y 0,32 = jalusta, oletus ei vika), f1-a, f3-a/b.
- F2 (PK LISTA3, e22): harmaa harkko + valkoinen räystään alapinta = t-portti-m15 "runko+palkit" (RAKENNUKSET-v127-paketti, ei tausta;
  mika (-91,3; 1,6)). Seuraavaksi: t-portti-m15-lod0.glb materiaalit/tekstuurit kohdassa (harmaa tasainen = puuttuva tekstuuri tai väärä UV).
- F1 (e06, -73,8; 304,8, punaiset levyt jalustan päällä): f1-b-kamera ei näytä; mika osui 1-3 jalustaan (-69,3; 297,4 y 1,37). PK: kulku +x,
  kohde kuvan oikeassa reunassa 3–6 m kamerasta (-77,8; 301,5). F3 (e02): mika vain lattiaa -> uusi kamera (PK: kulku +x, kamera -133,3; 292,9 y 2,5).
- F4 pois (mallin karkeus, PK ok).
Valmis v133 -> muuri/v133/paketoi.zsh, LAHTEET päivitys (M1, E4, E1, E1b, M8, M6, A 16 + a2, ikkunalaudat koko tausta, F-kohdat), KK katsoo
-> PT kuittaus -> PK TaustaKansio -> JU iso iPad -> vienti -> JUNASHA PK:lle (kulkukartta + esto M1/E4 kuten 0925-luovutuksessa).

## HETI v133:n JÄLKEEN: UUSINTALEIVONTA (PT/omistaja 09.54 + 10.15, KK 10.2x; NS johtaa pelin puolta)
- Varjostajiksi: lahipuut-v17/puut.json kaikki 5759 puuta, LEHVÄSTÖN ALFA mukaan (KK: läikikäs, ei möykky). Taustan V4_puukortit varjostavat vain
  alueilla, joilla ei ole 3D-puuta (sama 3 m sääntö kuin v17). EI ruukkuja/kalusteita (vain QA esinekoe, NS).
- Leivotaan KAIKKI yhtenä junana samalla auringolla: tausta 23, osasarja 86 ruutua (+karki.bin), muurikate, rakennukset 156 (leivo_valo.py LISAVARJ,
  leivo_osasarja.py, leivo_malli.py; SOPIMUS.md leivonta-216:ssa).
- SALI: oma valokartta avoimet-v52/juhlasali.glb:n omassa kehyksessä, korkeus 45°, atsimuutti 70° salin kehyksessä (0° = pohjoisovi = glb −Z,
  90° = itä = glb +X), kohti = (pohjoinen·cos70 + itä·sin70)·cos45 + ylös·sin45 (ValoKohteet.cs r. 260, Valopohja.SaliAurinko). Katto + palkisto
  varjostajiksi. Valojuovia EI (NS piirtää). Ristihäivytys/kaksi karttaa vain, jos KK:n ovipari vaatii.
- Muisti: pelissä ASTC 4×4 ~1,4 Mt/kartta (NS), varjostajat eivät kasvata.
- Parit suoraan KK:lle; NS tekee puun lähikuvaparin.

## Apuskriptit
muuri/apu-20261111/ (+ jakauma.py, kansi.py, poly.py, sisa.py, laatta.py, lahella.py (kaikki materiaalit r:n sisällä), lista.py, pysty.py).
Python ilman -I; shapely vain venv-lattia/bin/python3:lla. Odotusskriptissä pgrep-kuvio "m1/[a]ja-x.zsh" (muuten löytää itsensä).
Worktreet ennallaan + wt/lavastaja-luovutus-1031.
