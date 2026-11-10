# Natiivisepän luovutus 10.11.2026 klo 14.05

Edellinen: -1342 (62666bc4a): sen kohdat 1–6 ovat ENNALLAAN (tahdistus-A/B, panorointi, kertojan esilataus, Lontoo kuitattu, yksi tarkkuus,
ISS/PdG). Tämä lisää PT:n lisätyön 13.5x, joka on ennen kertojan esilatausta. Syy: kontekstivahti 25 % (7.37). Kansio Matkakirja-3d-selvittaja.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (ohje -1250). Älä poista mitään.

## 0. BRITANNIAN MAAKARTTA VAILLINAINEN SIIRTYMÄSSÄ (omistaja 12.26, PT 13.5x, Tekninen kunto) – AJO JU:N JONOSSA
- Kuva: Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261110/britannia-kartta-vaillinainen-1226.png.
- EI purkujumi (9d5be8823): kuva on uudelleenkäynnistyksen JÄLKEEN (2 pv £18 kuten lontoo-kartta-uudelleenkaynnistyksen-jalkeen-1226.png).
- Geometria mitattu kuvasta: tarkka alue = tasan 3×3 z8-laattaa (lon −2,81…1,41, lat 50,71…53,33) Lontoon ympärillä; muu maa esivanhemman
  rasterina (karkea), saumat laattarajoilla (lon 0°, lat 53,33°) – sävy vaihtuu tasojen välillä.
- Sama lokissa lokit/natiiviseppa-lontoo-opas-ipad-9d5be8823 (= 224.22-koodi): "matkaseuranta lontoo" 770 km:ssä karkeat 4–10/~30 yli 10 s
  (jo ennen lähtöä Pariisin yllä), pallo 43–53 %, "pyynnöt -" (ei Cesiumin elävä-kiirepyyntöjä), MVT jono 80 haussa 6 koko matkan,
  VARTIJA "palvelin käynnissä 20 (kiire 20) … kiire 11". SeuraavaRuutu-esilataus (GBR z6–8 1513 km:n näkymälle) oli jo valmis
  (peruttu 1418/1534, epäonnistui 116 = luultavasti reliefi). Saapuminen GBR loppui kattoon 20 s, aste 17,2 % (kaupunkitila, pallo pois).
- Hypoteesit: (a) jokin jono (kiire 20 = huntu/kerma/Sentinel-verkkohaut, 15 s aikaraja ×3) pitää Cesiumin rasterilataukset jumissa;
  (b) matkan 770 km tarvitsee z9:ää, jota esilataus ei hae. Pyyntölokia (Documents/pyyntoloki.txt) EI pyydetty: lippu jäisi laitteelle.
- AJO: _tyo/natiiviseppa/britannia-saumat/ajopyynto-1.md + sk-britannia-ipad-1.txt (valmis 224.22-app julkaisija-laite-218-a2e334b2e,
  ei käännöstä) → lokit/natiiviseppa-britannia-ipad-1-a2e334b2e. JU kuittasi 13.5x; näytön tallennetta EI (devicectl). 14.04 kansio tyhjä.
- LUE: B1/B2 (matka 1 s / 4 s), B4/B5/B7 (maa levossa 3/13/55 s), B6/B8 lentoharmaa taso (keltainen→vihreä = taso 2–8, magenta = puuttuu)
  täysikoossa + konsolin "matkaseuranta lontoo" ja "VARTIJA 171". Jos levossa korjaantuu → siirtymän latausjärjestys (a/b);
  jos ei → pysyvä lataus/välimuistivika. Korjaushaara valmiina: natiivi-backup natiiviseppa/britannia-saumat (wt
  /Users/Shared/Claude/wt/proto-selvittaja-britannia, a2e334b2e:n päällä, ei committeja vielä).
- PT tietää (syy osittain + ajo). KK:lle syy ja tila PT:n kautta, kun ajo luettu.

## MUUT JU-TULOKSET TÄLLÄ VUOROLLA (lukematta)
- muistikatto-lontoo-1 f08387e78: 4 min, signal 15, huippu 2896 Mt, VIKA 0 → lokit/natiiviseppa-muistikatto-lontoo-1.
- muistikatto-lontoo-2 f08387e78: 4 min, signal 15, huippu 3502 Mt, VIKA 0 → lokit/natiiviseppa-muistikatto-lontoo-2.
- muistikatto-pariisi-3: 14 min, huippu 3218 Mt, signal 15. (Tehtävä ei ole -1342:ssa: tarkista PT:ltä, kenen ja mitä odotetaan.)
- JU:n jono 13.5x: britannia-1, sitten NS lento-tahdistus/PE.

## VIESTIT TÄLLÄ VUOROLLA
PT: Britannia syy osittain + ajo (13.5x). JU: ajopyyntö britannia-1 (kuitattu).

## LISÄYS 14.15 (JU)
- ISO iPAD RIKKI 14.08–14.14: error 22 / CoreDevice 10002 ×3 kaikilla käännöksillä (tahdistus 06ac958d1, PE A 4444e211a, PK 8d22f34e4,
  britannia a2e334b2e; kansiot *-kaynnistysvika-1414). iPad TAUOLLA, JU pyysi omistajaa PT:n ja KK:n kautta. JU:n jono valmiina (PK4):
  britannia-1 → lento-tahdistus-1b SAMALLA 06ac958d1:llä (lokit/natiiviseppa-lento-tahdistus-ipad-1b) → PE A/B/A-2/B-2. Uusi käännös vasta,
  jos tahdistus kaatuu kahdesti, kun muut käynnistyvät (NS 14.1x).
- muistikatto-lontoo-3 f08387e78: 4 min, signal 15, huippu 3490 Mt, VIKA 0. NN-sarja (3×pariisi + 3×lontoo) valmis, lukematta.
- Seuraajalle: odota iPadia; sillä välin voi koodata kertojan esilatauksen (-1342 kohta 3), koska Britannia ja tahdistus odottavat laitetta.
