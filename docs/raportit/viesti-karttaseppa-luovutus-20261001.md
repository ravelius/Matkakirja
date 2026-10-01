# Karttasepän luovutus 1.10.2026 klo 07.5x (tilinvaihto)

Kaikki alla olevat ajot jatkuvat ilman sessiota (nohup/disown, PPID 1). Älä käynnistä niitä uudelleen, vaan tarkista ensin `ps`.

## 1. Jokipoltto `pyramidi-poltto/ajo-20260930` (polttovahti v5g)
- Pohja ja syvä z9–z10 ovat VALMIIT (aja.out: 07.18 "2 koodi 0"). Ketju `ketju.sh` (PGID 10198) ajaa nyt palloa (`pallo/aja-pallo.sh`, xargs -P 16 osa.sh).
- Polttovahti **v5g** (PID 89273) korvaa v5f:n, joka kaatui 06.2x: lipun ikälasku `stat` + "bad math expression", kun julkaisulippu katosi kesken. v5g otti polton valvontaan OMAKSU-tilassa:
  `OMAKSU=10198 zsh pyramidi-poltto/polttovahti-v5g.sh <U> <U>/ketju.sh 16 <U>/aja.out >> <U>/vahti.out`
- Väistöseuranta `vaistoseuranta3.sh` (PID 90074) seuraa vahdin PID:tä 89273. Kun Blender tai simulaattori on käynnissä, ytimiä on 4 ja nice 19.
- Huomio: `pallo/osa.sh:8` valittaa puuttuvasta `pallo/ytimet.txt`:stä (aja.out). Pallo etenee silti. Tarkista, lukeeko osa.sh rajoitteen muualta, ennen kuin korjaat mitään.
- Lokit: `aja.out`, `vahti.out`, `2.log` ja `pallo/aja.out`. Levyraja: vahti pysäyttää alle 40 Gt:ssa ja jatkaa 45 Gt:ssa. Päätoimittaja haluaa tiedon, kun tila laskee alle 45 Gt:n, ennen kuin vahti pysäyttää.
- Polton jälkeen (ei ilman omistajan lupaa):
  - vientikuvat 27 vs 30 (Perekop poistettu, raeton)
  - kerma 2026-09-30-p060 (z8 + alasnäyte, `--polygonit krim-2026-09-30/maapolygonit.geojson`)
  - täysi vienti ja PALLO_LAATTAVERSIO-PR
  - Natiivisepälle kansionimi 2026-09-30-pohja-20260930

## 2. Euroopan S2 L2A -kesämosaiikki `2026-10-01b` (omistajan OK 30.9. 22.3x, vientilupa Päätoimittajalta)
- PID 46985, kansio `/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-eurooppa-s2/2026-10-01b/` (symlink `pyramidi-poltto/iss-maanpinta/eurooppa-s2`).
- Loki `ajo.log` (rivit "LOHKO x_y … n/169"). Klo 07.53 valmiina oli 41/169, ja pallopoltto hidastaa. Arvio on iltapäivä.
- Ajo on jatkettava: `tila.json` sisältää valmiit lohkot ja vesisiirrot. Uudelleenkäynnistys (vain jos prosessi on kuollut):
  `cd <kansio> && ALUE=eurooppa ULOS=<kansio> nohup nice -n 15 node --max-old-space-size=6000 euromosaiikki.mjs >> ajo.log 2>&1 & disown`
- Korjaukset v1:een (2026-10-01 jää testiversioksi):
  - BOA-offset on aina 0, koska Earth Searchin `boa_offset_applied=false` on harhaanjohtava (sama DN-taso) ja aiheutti tummat kolmiot.
  - Avovesi 2–8 km:n päässä rannasta häivytetään MERI-väriin (48, 64, 85), mikä poisti MGRS-ruudukon merellä.
- Kun "VALMIS" on lokissa:
  1. `python3 viimeistele.py` tekee merilohkojen z7–z10-laatat, esikatselun ja pelin jaon symlinkkeinä kansioon `vienti/` sekä tiedoston `vienti/laatat.json`.
  2. `zsh vie.sh` vie ämpäriin `linssit/astronautin-kamera/s2-eurooppa/v1/{taso}/{x'}/{y'}.jpg`. Siinä taso = z − 6, x' = x − 27·2^taso ja y' = y − 13·2^taso. Vientiä on noin 57 000 PUT ja 0,8 Gt, ja Päätoimittaja on antanut siihen luvan.
  3. Ilmoita Linssiseppä 2:lle ja Päätoimittajalle: polku ja vertailukuva (Alpit tai rannikko), enintään 8 riviä. V1:een viedään pelkkä jpg, ei vesimaskia.

## 3. Valmiit tämän session aikana (tiedoksi)
- Helsingin ISS-esimerkkipaketti `pyramidi-poltto/iss-maanpinta/helsinki-esimerkki/` (Linssiseppä 2 käytössä).
- S2-koe `iss-maanpinta/s2koe/`, Alppikoe `iss-maanpinta/eurooppa-koe-alpit/`, selvitys `iss-maanpinta/selvitys-20260930.md`.
- Black Marble 8192² (2 × 2) `pyramidi-poltto/iss-yovalot-8192/` (Linssiseppä kytki, Päätoimittaja vei).
- Levyn siivous: `maapallon-vuosi-2024` ja `bmng-2026-09-28` siirrettiin T7:lle symlinkeillä.

## Avoimet (ennallaan)
- Saaret: web-kuvapari, sitten haara `karttaseppa-saaret` (b90af1aaf) junaan.
- Luonnos-PR #3635 (joet-rauha), kun omistaja hyväksyy joet.
- UKR-väritason uudelleenpoltto (Krim).
- ISS-kameran pilotti (25 kohdetta) vasta omistajan päätöksellä.
