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

- Bahaman suurten matalikkojen turkoosi puuttuu. PT toivoo batymetriaan perustuvaa ratkaisua myöhemmin.
- Aluekohtainen tci_lut (aavikko) tehdään LS2:n esimerkkikuvien perusteella.
- Saaret-haara ja Euroopan pyramidi z11: ennallaan, ks. 2.10. luovutus.
