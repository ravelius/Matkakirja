# Natiivisepän luovutus 2.11.2026 klo 15.40 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-1430.md (PR 5996, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 744e72d03 testit läpi ja peili ajan tasalla (15.38).

## JONO
1. **SAAPUMISEN NYKÄYSVAHTI (PT 15.3x, korjaus NS:lle):** 4.24:n mukaan raskas työ esiladataan ennen liikkeen alkua. Mittaa
   NUI:n saapumishaarassa 58f0974db (natiivi-ui/saapuminen-keskustaan-218; zoomaus keskustaan ennen introa, korvaa nykyisen
   saapumisen). Koeyhdistelmä valmiina: haara natiiviseppa/saapuminen-koe-218 = dee0476b3 (runko 5cba23158 + 58f0974db, ei
   runkoon), työpuu wt/proto-natiiviseppa-saapuminen, laiteäppi lokit/natiiviseppa-app-210-runko-dee0476b3-laite.
   - **Ennen-mittaus tehty** (`juna218/saapuminen-matka218.sh <kansio> <sha9>`: uusi peli Lontoo → bussi Pariisiin; siemen 5:llä
     ei lentoa): loki lokit/natiiviseppa-saapuminen-matka-ennen2-20261102. Keskustan zoomaus 6,9 s: 70 pitkää ruutua, suurin
     191 ms. Syyt: PiirrosKerros.Purku 373 ms/15 ruutua (yksi ruutu 83 laattaa, 149 ms: purun ≤ 1 laatta/ruutu -raja ei pidä
     ensinäytössä), Laattapalvelin(.LataaKiire) 252 ms, Nimikerros 281 ms/81, Saapumistraileri + Kuvat.Lataa 1 s:n jälkijaksossa
     (83–85 ms; traileri alkaa heti zoomauksen jälkeen, PerillaJatko).
   - Korjaussuunta: (a) Pariisin piirroksen keskustan lähitason laatat puretaan/pakataan Matkalla-tilassa ennen Perillaa
     (esilataus taustalla, ≤ 1/ruutu); (b) purun raja myös ensinäyttöön; (c) traileri vasta 4.24:n +1 s:n jälkeen tai sen kuvat
     esiladattuna. Mittaa jälkeen samalla skriptillä, raportti PT:lle (ennen/jälkeen), tieto NUI:lle (local_43962c89-…; NUI:lle
     kerrottu 15.39, ettei muuta näitä).
   - `saapuminen218.sh` (ui jatka) EI kelpaa: jatko kaupungissa lentää kameran ilman Perillaa (loki natiiviseppa-saapuminen-ennen-20261102).
2. **Pieni iPad (omistajan laite): asennus VAIN, kun KK välittää omistajan luvan.** Ennen käännöstä NUI:n merget (PT 15.0x):
   Liikun kumous 47067b095 + 14.37:n kohdat 1–3 eb9ad99fc (kun PT kuittaa parin) ja kohta 4. Sitten `juna213/pieni-ipad.sh <sha9>`.
3. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (tarkista media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio vaihtuu).
4. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle
   "kaikille", rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
5. **Odottavat (tila tarkistamatta tänään):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta;
   PK bugi 2; NUI:n leikehaara 7280634c4 EI. Pariisin vieritys osa 3 (pakkaus ~11 ms/laatta) EI NYT (PT).
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = 744e72d03** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Tänään 23b37d035:n jälkeen:
  NUI nostot kiinni panoroitaessa e61f72c0b → 3a22dbaf2; NS lepo-1s-218 (e4266d7b3 täysi tahti 1 s kameran liikkeen jälkeen
  + 533b082d0 komentoruutu pois KameraKirjoittajan vahdista) → 5cba23158; VS salilampo-218 2181a7288 → 744e72d03
  (testit 2223/793/586, tarkista 0, peili 15.38).
- **Nykäysvahti, PT:n linja 15.4x:** 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei
  muuteta. Hylätty 4f2305111 (natiiviseppa/nykaysvahti-218, raja tahdin mukaan) jää vain peiliin. Lepo-1s:n mittaus: 33 ms:n
  ruudut 42 → 2, Pariisin vierityksen liikkeet 14/19/15 → 0/8/3 pitkää (lokit natiiviseppa-{nykays-ennen,lepo1s-jalkeen}-20261102).
- Kansiot rungossa ennallaan: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- Laiteäpit: 254ecdc65 (runko 1780f8198), 533b082d0 (lepo-1s), dee0476b3 (saapumiskoe). Pieni iPad: asennettuna 52ba93dea (12.33).
- Mittausskriptit proto-3d/tyokalut/natiiviseppa-skriptit/juna218/: piirros-vieritys218.sh, saapuminen-matka218.sh (ipad-lukko).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -muisti, -tyokalut, -koe67, -varjo, -saapuminen eikä T7-kopioita (-striimi, -nykays ja -lepo poistettu).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-218).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`
  (commit peiliin ensin; ~4–8 min).
- Puhtaus `git merge-tree --write-tree HEAD <sha>`; tarkista rc=1 tai testi punainen → korjaus tekijän haaraan.
