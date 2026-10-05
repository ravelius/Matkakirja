# TILANNE 5.10. klo 06.5x (LOPULLINEN, tilinvaihto 99 %)

- **Tropiikki v2e:** osa-ajot PID 45738/45742/45745/45748, kukin noin 12/47 lohkoa (yhteensä 8 + 47 = 55/196). Noin 14 min per lohko per osa → valmis noin klo 15–16.
  Valmistuttua: tilat yhteen, tarkistus, kuvapari Karibia + Indonesia PT:lle, sitten `touch iss-maailma-s2/v2/tropiikki/tarkistettu.ok` → omistajan vienti (PID 4918) vie ja kirjoittaa laatat.json → ilmoita LS2:lle (polun vaihto luvallinen) ja rivi PT:lle.
- **Korjaussarja v2e:** P-Afrikka 10/10 ja Aasia 28/28 valmiit; Amerikka 48/68 (PID 34664).
- **S2-indeksi v2b (sävytasaus):** `aja-v2b.sh` PID 80467, tropiikki 1 600/1 802, sitten eurooppa → P-Afrikka → amerikka → aasia (valmis noin klo 8–9).
  Sitten `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (`tci-kooste.mjs` soveltaa savy-kenttää) PT:lle ja vienti vie-paketti.sh:lla polkuun `s2-indeksi/v2b/` (LAHTEET.md). LS2:n koodi on valmis, ja hän vaihtaa version kuittauksen jälkeen.
- **S2-indeksi v2c vaihe 1 (ehdokkaat):** `aja-v2c-ehdokkaat.sh` PID 25172, eurooppa 400/2 177, valmis noin klo 10–11. Vaihe 2 (naapurisovitus + avomeren himmein kohtaus) on kirjoittamatta, ks. alla.
- **Euroopan kausiketju:** syksy 48/169 (PID 13778), sitten talvi uudella koodilla.

---

# Karttasepän luovutus 5.10.2026 klo 06.0x (viikkoraja 97 %, tilinvaihto noin 07.15)

Ajot jatkuvat ilman sessiota. Ne on käynnistetty perl fork+setsid -kaavalla. Tarkista `ps` ennen uudelleenkäynnistystä, ja lopeta prosessi vain omalla PID:llä.
Vanhemmat vaiheet: `viesti-karttaseppa-luovutus-20261002.md` (päivitykset 2.–4.10.).

## VALMIIT JA VIEDYT (ei toimia)

- **Kuvauspaikat v1:** 25 paikkaa, `linssit/astronautin-kamera/kuvauspaikat/v1/`. LS2:n natiivi käyttää niitä.
- **S2-indeksi v1:** `s2-indeksi/v1/maailma.json` + 5 alueindeksiä.
- **S2-indeksi v2 (5.10. 06.3x):** `s2-indeksi/v2/`. Aukollisiin ruutuihin lisätty toisen radan kuva (rata luetaan tuotenimestä `_R###_`). Aukollisia ruutuja 3 269 → 1 215. LS2 vaihtaa `S2Maailma.Versio` → v2.
- **S2-maailma v2 (BOA-offset v2d + merijää v2c):** Amerikka, P-Afrikka ja Aasia+Australia viety polkuun `s2-maailma/v2/` omistajan skriptillä `pyramidi-poltto/vie-s2-maailma-v2.sh` (PID 4918). Skripti odottaa tropiikin tarkistusmerkkiä `iss-maailma-s2/v2/tropiikki/tarkistettu.ok` ja kirjoittaa sen jälkeen `laatat.json`:n.
  - Päätoimittaja hyväksyi lopputarkistuksen.
  - LS2 saa vaihtaa polun, kun tropiikki ja laatat.json ovat ämpärissä. Ilmoita silloin LS2:lle suoraan ja rivi Päätoimittajalle.
- **Eurooppa:** s2-eurooppa/v1 on ehjä (v2 = v1 pikseleittäin), ei uutta vientiä.

## KÄYNNISSÄ

- **Tropiikki v2e** (koko alue uudelleen, PT:n päätös): 4 osa-ajoa, PID:t 45738, 45742, 45745 ja 45748. Ne kirjoittavat kansioon `iss-maailma-s2/v2/tropiikki`.
  - Osat: `osa{0..3}.txt` ja tilat `tila-osa{0..3}.json` (env `TILATIEDOSTO`); 8 ensimmäistä lohkoa ovat `tila.json`:ssa.
  - Tilanne klo 06: noin 7–8/47 per osa; yksi lohko kestää noin 14 min, valmis noin klo 17–18.
  - Valmistuttua: tarkistus (`esik.py`-malli + z8-otokset Karibia ja Indonesia), kuvapari Karibia + Indonesia PT:lle, sitten `touch v2/tropiikki/tarkistettu.ok`, jolloin vienti jatkuu automaattisesti.
- **Korjaussarja v2e** (läikkäkorjaus jo viedyille alueille): `iss-maailma-s2/v2e/<alue>`, lohkolistat `koe-laikka/listat/<alue>-10.txt`.
  - P-Afrikka 10/10 valmis. Amerikka (PID 34664, 35/68) ja Aasia (PID 34672, 22/28) ajavat nice 19:llä.
  - Valmistuttua: kuvapari PT:lle, sitten `touch v2e/tarkistettu.ok` ja omistajan Run-rivi `pyramidi-poltto/vie-s2-maailma-v2-korjaus.sh`. Skripti vie polkuun `s2-maailma/v2-korjaus/` ja kirjoittaa `korjaus.json`:n (bittikartta, `v2e/korjaus-json.py`).
  - Run-rivi: `cd /Users/Shared/Claude/pyramidi-poltto && perl -e 'use POSIX "setsid"; exit if fork; setsid(); open STDIN,"</dev/null"; open STDOUT,">>","vie-s2-maailma-v2-korjaus.log"; open STDERR,">&STDOUT"; exec "zsh","vie-s2-maailma-v2-korjaus.sh"'`
- **S2-indeksi v2b** (täytekiilan sävytasaus, PT 5.10.): `iss-s2-indeksi/aja-v2b.sh` (PID 80467) → `savytasaus.mjs <alue>` → `iss-s2-indeksi/v2b/`.
  - Valmistuttua: `VERSIO=v2b python3 maailma-json.py`, kuvapari v2 vs. v2b (20MRB, 20MRC, 28SCA + yksi Euroopan ruutu) PT:lle.
  - `tci-kooste.mjs` pitää laajentaa soveltamaan `savy`-kenttää ennen kuvaparia.
  - **Odota LS2:n laitekuvia (20MRC ja Kanaria) ennen vientiä.**
- **S2-indeksi v2b LAAJENNETTU (PT 5.10. 06.2x, LS2:n laitekuvat `lokit/linssiseppa2-maailma-10c31692/kuvat`).** Ongelmat: 20MRC lievä pystysauma ja samea täyte, 28SCA suorat heijastussaumat avomerellä, Meksikon suisto 11SPR (2024-08-27) vs. 11SQR (2023-07-01) vaalea suorakulmio.
  **PT:n järjestys 06.3x:** v2b = vain sävytasaus (osa 1, valmis noin 08), sitten v2c = osat 2 ja 3 (uusi polku `s2-indeksi/v2c/`, naapurin sama datatake, pisteet enintään noin 25 % huonommat). Kuvapari kummastakin PT:lle ennen LS2:n juuren vaihtoa (11SPR/11SQR, 20MRC, 28SCA + yksi Eurooppa).
  Osat:
  1) **Sävytasaus** täytekuvalle (käynnissä, `savytasaus.mjs`, kenttä `valinta.savy`).
  2) **Naapuriruuduille sama ottopäivä tai rata:** ehdokaslistat haetaan uudelleen (`s2-indeksi-v2.mjs`:n `ruutu()`-ehdokkaat tallennettava välimuistiin), sitten naapurisovitus. Valinta 0 vaihdetaan naapurin kanssa samaan datatakeen (sama päivä + satelliitti, tai sama rata), jos pisteet ovat enintään noin 25 % huonommat. Arvio 3–4 h STAC-hakuja.
  3) **Avomeren ruuduille vähäheijasteinen kohtaus:** mittaa TCI-yleiskuvan vesipikselien kirkkaus (tai käytä aurinkogeometriaa `view:sun_elevation`/`view:sun_azimuth`) ja valitse himmein.
  **v2c vaihe 1 KÄYNNISSÄ (06.3x):** `iss-s2-indeksi/aja-v2c-ehdokkaat.sh` → `s2-indeksi-v2c.mjs` (tallentaa `ehdokkaat` 20 kpl/ruutu) → `v2c/valinnat3*.json`, valmis-merkki `ajo-v2c-ehdokkaat.valmis` (noin 3–4 h). Vaihe 2 (kirjoitettava): naapurisovitus ehdokkaista ja avomeren himmein kohtaus → `v2c/indeksi*.json` + `VERSIO=v2c python3 maailma-json.py`.
  Lopuksi kuvapari v2 vs. v2b PT:lle (20MRB, 20MRC, 28SCA, 11SPR/11SQR + yksi Euroopan ruutu), sitten vienti vie-paketti.sh:lla. LS2 vaihtaa version.
- **Euroopan kaudet:** `iss-eurooppa-s2/kaudet/ketju-kaudet.sh` (PID 52116); syksy käynnissä (PID 13778, 41/169), sen jälkeen talvi.
  - Kausiskriptiin lisätty 5.10.: merimaski, napasäännöt, v2e ja kevään lumenvälttely.
  - Kevät valmis (169/169) ja pohjoiskorjaus (65 lohkoa) tehty. Tarkistettu: lumineliöt ja merijää poissa. Avoin: yksi Onegan suunnan järvi punertava.
  - Syksy ajaa vanhalla koodilla, joten sen napalohkot tarkistetaan valmistumisen jälkeen.
  - Talven käyttöönotosta päättää omistaja kuvaparin perusteella.

## SKRIPTIT JA OPIT

- **BOA-offset (v2d):** Earth Searchin 04.00-näkymistä osa on +1000 DN, eikä lippu ole luotettava, joten offset mitataan näkymäkohtaisesti. Muistissa: `s2-earth-search-baseline-04-offset`. TCI:hin vika ei vaikuta.
- **maailmamosaiikki-v2e.mjs** = v2d + v2c (merijää) + v2e (alle 200 px:n saaret eivät ole rannikkoa). Lisätilat: `DIAG04`, `MGRSLISTA`, `PIKKUSAARET` ja env `TILATIEDOSTO`.
- **vie-paketti.sh** ei ylikirjoita mitään, joten jokainen päivitys menee uuteen polkuun tai tiedostoon.
- **Isot laattasarjat** viedään omistajan Run-skriptillä (aws s3 sync). vie-paketti on liian hidas 91 000 laatalle.
- **Heredocit,** jotka kirjoittavat JS-koodia: aina lainattu `<<'PY'` ja `node --check` heti muokkauksen jälkeen (muisti `heredoc-js-lainaus`).

## AVOIMET

- **Tropiikki v2e, tunnetut jäännökset (PT hyväksyi vientiin 5.10. 17.0x, ei korjata nyt):**
  - Amazonin itäosan vaalea ratakaista (z8, noin 58–57° W, 1–2° N): tasauksen viite ESA WorldCover 2021 on itse usvaisempi itään päin.
  - Sumbawan suora maasauma (z8).
  - Palataan, jos löytyy parempi viite (esim. tuoreempi pilvetön S2-vuosikomposiitti).
  - Menetelmä: `iss-maailma-s2/tasaus.mjs` (k7-asetukset: SIGMA_M 1500, ALA 0,6, YLA 1,6, USVA 1,6, SINI 99, varakorjaus) ja K-kenttä `tasaus-kentta.mjs` (σ 250 km).
    Lisäksi järvet MERI-väriin, `rengas.mjs` (KYNNYS 0, pilvet merellä vedeksi) ja aukkotäyttö kahdella näkymällä (`maailmamosaiikki-v2e.mjs`, POISSULJE-env).
  - Alkuperäiset laatat: `v2/tropiikki/laatat-v2e-alkuperainen`.
- **S2-indeksi v2c (17.48) ja v2d (17.58) viety** (Julkaisija). v2d = v2c + Colorado-suisto: 11SPR ja 11RPQ valinta 0 = S2B 2025-07-30.
  11SPR:n maalle jää radan reunan sauma (märkä muta vs. kuiva suola), eikä savy (v2e) auta. LS2 tarkistaa simukuvasta.
  Jos sauma näkyy: koko 11SPR:n ja 11SQR:n länsiosan kattavat datatakit, esim. S2A 2022-10-22, S2B 2025-11-30 ja S2A 2025-01-09 (11SPR nodata 0, 11SQR 55 %);
  sauma siirtyisi Gran Desierton dyyneille. Tarkista myös 11RPQ ja 11RQQ.
- **Rengaskorjaus viety (PT hyväksyi 18.2x; omistajan Run `pyramidi-poltto/vie-rengaskorjaus-20261005.sh`):** s2-maailma/v2-korjaus/ + korjaus.json
  (P-Afrikka, Amerikka, Aasia, myös v2e-läikkäkorjaus) ja s2-eurooppa/v2/ (Euroopan jako, 36 167 korjattua). LS2:lle Euroopan polku vasta viennin jälkeen.
  Varmuuskopiot: v2e/<alue>/laatat-ennen-rengas.
- **SEURAAVA ERÄ (PT 18.2x, ei pidätä vientiä):**
  1) Madeiran itäosan paksu pilvi saarella: etsi selkeä otto ja ruudun uusinta Euroopan mosaiikkiin.
  2) Lanzaroten pohjoispuolen pistejono ja kaksi täplää: pilvihaamujen jäänteet. Rengaskorjaukseen pienet "maa"-komponentit merimaskin sisällä vedeksi.

- Bahaman suurten matalikkojen turkoosi puuttuu. PT toivoo batymetriaan perustuvaa ratkaisua myöhemmin.
- Aluekohtainen tci_lut (aavikko) tehdään LS2:n esimerkkikuvien perusteella.
- Saaret-haara ja Euroopan pyramidi z11: ennallaan, ks. 2.10. luovutus.
