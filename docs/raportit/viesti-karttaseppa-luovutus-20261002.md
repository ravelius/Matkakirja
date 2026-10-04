# Karttasepän luovutus 4.10.2026 klo 16.2x (PÄIVITYS)

- **BOA-offset-vika:** Earth Searchin 04.00-näkymistä (2022) osa on +1000 DN, eikä lippu earthsearch:boa_offset_applied ole luotettava.
  Korjaus **v2d**: offset mitataan näkymäkohtaisesti (B02–B04, tummat pikselit tai erotus) kaikissa skripteissä (maailmamosaiikki-v2.mjs,
  euromosaiikki-v2.mjs, kausimosaiikki.mjs, kuvauspaikat-v2.mjs). TCI-kuviin vika EI vaikuta.
- **Eurooppa v1 ehjä** (v2 = v1 pikseleittäin), ei uutta vientiä. Euroopan kausiketju (kevät → syksy → talvi) ajossa v2d:llä (PID ketju-kaudet).
- **Maailman v2** kansioissa `iss-maailma-s2/v2/<alue>` (P-Afrikka ja tropiikki kokonaan, Amerikka 73 ja Aasia 112 lohkoa v1-kloonin päälle).
  Vienti `s2-maailma/v2` vasta, kun Päätoimittaja on kuitannut kuvaparit ja luvut. Viikonloppuvienti pysäytetty (`iss-maailma-s2/PYSAYTA`).
- **Kuvauspaikat v1 VIETY** (25 kpl, `linssit/astronautin-kamera/kuvauspaikat/v1/`), LS2:n natiivi käyttää niitä.
- **ISS-kamera koko maailmaan VIETY:** `s2-indeksi/v1/maailma.json` + 5 alueindeksiä (noin 22 600 ruutua).
- Avoinna: aluekohtainen tci_lut-ehdotus LS2:n esimerkkikuvista (aavikko), maailman v2:n kuvaparit, Euroopan kausien kuvapari (talvi = omistajan päätös).

---

# Karttasepän luovutus 3.10.2026 klo 23.5x (PÄIVITYS)

## Tila
- **Viety:** P-Afrikka + Lähi-itä (2.10. 22.51) ja **Amerikka (3.10. 23.45, 91 394 laattaa)**. Vienti PID 67566 odottaa `aasia-australia/tarkistettu.ok`.
- **Merijääkorjaus `maailmamosaiikki-v2.mjs` (v2c)** = nyt myös `maailmamosaiikki.mjs` (v1 tallessa `-v1`):
  1. GSHHG-merimaski (`pyramidi-poltto/gshhs-data-j27b/ne_10m_ocean.geojson`, parillisuussääntö): meren pikseli ilman kelpo-dataa → avomeri.
  2. Napaseutu |lat| > 50°: kaikki kanavat > 0,08, TAI harmaa > 0,05, TAI maaksi luokiteltu > 6 px GSHHG-rannasta → avomeri.
  Ennen tätä merijää ja pilvet näkyivät MGRS-ruutujen rajaamina valkoisina suorakulmioina.
- **Aasia-australia** (PID 46687, VANHA v1-koodi) 219/361 klo 22.4x → valmis noin su 4.10. klo 6.30, indeksi noin 1 h, sitten ketju aloittaa tropiikin (v2c).
  **Ennen tarkistusmerkkiä:** napalohkot listataan (`ALUE=aasia-australia node koe-jaa/kaukomeri.mjs`, raja n > 40, sekä `jaalohkot.mjs` n > 150),
  poistetaan `aasia-australia/tila.json`:n `valmiit`-kohdasta (varmuuskopio ensin) ja ajetaan
  `ALUE=aasia-australia LOHKOT=… node maailmamosaiikki-v2.mjs` setsid-kaavalla. Tarkista sitten yleiskuva (`esik.py`-malli) ja z8-lohkorajat.
- **#3910 mergetty** (v2593): tuotannon 2026-09-30-pohjan jokikoodi mainissa; #3635 suljettu.
- MLT-kerma: ei tehty (MLT:llä ei kerma-kenttää eikä webin väritasoa). Maltan merisauma on natiivin piirrossa (data ok, web-kuva `proto-3d/lokit/natiiviseppa-sauma-web/`).

---

# Karttasepän luovutus 2.10.2026 klo 22.5x (PÄIVITYS, uusi tili)

## Muuttunut 22.25–22.51
- **P-Afrikka + Lähi-itä tarkistettu ja VIETY** 22.51 (22 165 laattaa, indeksi, alueet.json, laatat.json; todennettu `aws s3 ls`).
- Viikonloppuvienti kaatui 22.26 (PID 99469): tilinvaihdossa perityn päätteen stdin kuoli → `aws` "init_sys_streams: Bad file descriptor".
  Skriptiin lisätty `exec </dev/null`. Omistaja ajoi uudelleen 22.40 setsid-irrotettuna: **vienti PID 67566**, odottaa Amerikkaa.
- **Amerikka** (mosaiikki PID 46451, alkoi 22.15) etenee ~5,6 min/lohko → valmis noin **la 3.10. klo 23**.
- **Euroopan kaudet valmisteltu:** `iss-eurooppa-s2/kaudet/kausimosaiikki.mjs` (KAUSI=kevat|syksy|talvi → `s2-eurooppa-<kausi>`;
  talvessa SCL 11 lumi kelpaa; täyttönäkymät ja pilviraja 30→70 kuten maailmassa). Kesän vesisiirtoja EI peritä (32TLT:n
  kesäsiirto värjäsi kevään järvet punamustiksi, koe `kaudet/koe1-*-kesasiirto`). Koe Alpit 33_22 kunnossa (`koe-kevat`, `koe-talvi`).
- **`kaudet/ketju-kaudet.sh` PID 72639** odottaa maailman ketjun (34482) loppuun, sitten kevät → syksy → talvi; merkki
  `s2-eurooppa-<kausi>/valmis-tarkistettavaksi`. Ei vientiä; kuvapari omistajalle. Ei rinnakkain, koska kone on kuormitettu.

---

# Karttasepän luovutus 2.10.2026 klo 22.1x (LOPULLINEN, tilinvaihto)

Ajot jatkuvat ilman sessiota. Ne on käynnistetty **perl fork+setsid** -kaavalla, joten niillä on oma prosessiryhmä (memory `pitkat-ajot-setsid-irrotus`). Tarkista `ps` ennen uudelleenkäynnistystä. Lopeta prosessi vain omalla PID:llä.

## VALMIIT 1.–2.10. (ei toimia)
- **Peruskartta 2026-09-30 tuotannossa** 2.10. klo 03.03 alkaen.
  - Sisältö: raeton patina, GEOGLOWS-joet koe-d-säännöin, Perekop pois.
  - Web: #3818 (v2531/2532) ja pyramidi-osoitin, varmuuskopio `pyramidi-20261002-0303.json`. Pallo on deltasarja (`delta.perus` = 2026-09-27-pohja-20260927); raeton patina muutti 100 % laatoista. Kerma 2026-09-30-p060 on ämpärissä.
  - UKR-väritaso 2026-10-01-tasoitus: Krim on Ukrainan värissä, todennettu laatoista.
  - Natiivi tulee Natiivisepän junassa (haara sarja-20260930).
- **S2-eurooppa/v1 ämpärissä** (57 629 laattaa) ja aukkokorjattu: rataleveyden reunan aukot täytetään täyttönäkymillä, jotka koskevat vain dataa vailla olevia pikseleitä.
- **S2-indeksi v1 ämpärissä.** Sisältää 2 177 ruutua, `aukoton`-kentän, SCL-osoitteen ja kattavuuden mukaan valitut varakuvat.
- 25 kuvauspaikan paketit PERUTTU (omistaja 1.10. klo 10.0x). Tilalle tuli indeksi ja laitteen oma haku.
- ROOMA-nimiön hyppy on natiivin vika; webin ladonta on todennettu kunnossa olevaksi koodista. Natiiviseppä korjaa.

## KÄYNNISSÄ: maailman S2 (omistaja: kone vapaa ma 5.10. asti)
- **PID:t 2.10. 22.10:** ketju.sh **34482**, mosaiikki (node maailmamosaiikki.mjs) **34487**, omistajan viikonloppuvienti **99469** (odottaa P-Afrikan tarkistusmerkkiä).
- **Aikataulu (arvio):** P-Afrikan uudelleenajo ja indeksi noin klo 23–24 (2.10.) → Amerikka (274 lohkoa) noin la 3.10. klo 14 → Aasia ja Australia (361) noin su 4.10. klo 10 → tropiikki (196) noin ma 5.10. klo 0. Tropiikki valmistuu siis ehkä vasta maanantain jälkeen. Indeksi kestää noin 40 min aluetta kohti. Uusi sessio luo tarkistusmerkit; ilman niitä vienti odottaa.
- **Ketju** `/Volumes/T7 4TB/Matkakirja-karttaseppa/iss-maailma-s2/ketju.sh`, PID 34482, loki `ketju.out`.
  - Järjestys: pohjois-afrikka-lahi-ita → amerikka → aasia-australia → tropiikki.
  - Jokaiselle alueelle: `maailmamosaiikki.mjs` (ALUE=…, jatkettava `<alue>/tila.json`) → `iss-s2-indeksi/s2-indeksi.mjs` (ALUE=…) → merkki `<alue>/valmis-tarkistettavaksi`.
  - Lohkot ovat tiedostossa `lohkot.json`: 65 / 274 / 361 / 196 Z6-lohkoa, ei Eurooppaa eikä napoja.
  - Vuodenaika määräytyy MGRS-vyöhykkeestä: ≥ 20° kesä–elo, ≤ −20° joulu–helmi, tropiikki koko vuosi.
- **P-Afrikka:** 13 aukollista lohkoa ajetaan uudelleen, koska täyttönäkymien raja nostettiin 3 → 8. Tilanne klo 22.07 oli 63/65.
- **Tarkistus ennen vientiä:** kun merkki `valmis-tarkistettavaksi` ilmestyy, katso esikatselu.
  - Esikatselun saa koottua `<alue>/laatat/6/*/*.jpg`:stä (mallina scratch-skripti: 128 px per lohko).
  - Jos maalla on tummia läikkiä, etsi `ajo.log`:sta rivit "aukkotäyttö … kattamatta >0", poista vastaavat lohkot `tila.json`:n `valmiit`-kohdasta ja aja ne uudelleen.
  - Kun esikatselu on kunnossa, luo `<alue>/tarkistettu.ok`.
- **VIENTI on omistajan ajama** `pyramidi-poltto/vie-viikonloppu-s2-maailma.sh` (PID 99469, loki `vie-viikonloppu-s2-maailma.log`).
  - Skripti odottaa merkkiä `tarkistettu.ok`, vie sitten `s2-maailma/v1/{z}/{x}/{y}.jpg` ja `s2-indeksi/v1/indeksi-<alue>.json` ja lopuksi tiedostot `laatat.json` (saatavuusbittikartta, `saatavuus.py`) ja `alueet.json`.
  - Muoto on sovittu Linssiseppä 2:n kanssa.
  - Pysäytys: `touch iss-maailma-s2/PYSAYTA`.
- **Tunnetut rajoitteet:** Sahelissa näkyy ruutukohtaista sävyvaihtelua (kesä vs. ympärivuotinen vaihtuu 20° kohdalla). Idässä on heikkoja MGRS-saumoja.
- Ketju jumitti 1.10. klo 21 – 2.10. klo 20.59, koska `kill -0 0` on aina tosi. Vika on korjattu. Aikataulu siirtyi noin vuorokaudella, joten tropiikki valmistuu todennäköisesti vasta maanantain jälkeen.

## SEURAAVAT (Päätoimittajan hyväksymä järjestys 1.10.)
1. Maailman alueet ja niiden indeksit (yllä).
2. Euroopan S2 kevät (huhti–touko), syksy (syys–loka) ja talvi (joulu–helmi, lumi). Talven käyttöönotosta päättää omistaja kuvaparin perusteella (hänen linjansa: talvi = BMNG).
   - Toteutus: `euromosaiikki.mjs`:n kaudet ja ULOS uuteen kansioon `s2-eurooppa-<kausi>`.
3. Pyramidi z11 Eurooppaan: poltetaan levylle, mutta EI viedä ennen kuin Pelikoodari ja Natiiviseppä ovat kuitanneet tason 11 tuen. Heiltä ei pyydetä nyt.
4. Euroopan S2 z11 vain, jos aikaa jää.

## Avoimet (ennallaan)
- Saaret: haara `karttaseppa-saaret` (b90af1aaf, worktree poistettu): ensin web-kuvapari, sitten junaan.
- Luonnos-PR #3635 (joet-rauha, sisältää raeton-commitin 8dae6c586): mergetään, kun omistaja hyväksyy.
- Repon `tools/vie-delta.mjs`:n spread-pinon ylivuoto: korjauksesta on oma tehtäväsiru. Paikallinen korjattu kopio: `ajo-20260930/vie-delta-paik.mjs`.
