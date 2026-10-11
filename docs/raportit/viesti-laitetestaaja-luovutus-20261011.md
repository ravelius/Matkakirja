# Laitetestaaja: luovutus 11.10.2026 aamulla (nollaus, PT:n pyyntö 50 %) + aloitusviesti Olavinlinnan 3. kierrokselle

## Tila: ODOTTAA SIMUVUOROA
Ei käynnissä olevia ajoja, oma iPad `3622D89D` sammutettu, ei omia worktreitä. Haara `laitetestaaja-savukierros-b13`, kaikki pushattu (kärki `git log -1`). Simu vain Julkaisijan "SIMULAATTORI NYT" -vuorolla (1 simu kerrallaan, `n == 0`), käännöslukkoa ei tarvita.

## Seuraava tehtävä (PT 11.10. ~04.40): Olavinlinnan ensikertalaisen 3. KIERROS yhdistetyllä v7:llä
- App: `/Users/Shared/Claude/proto-3d/lokit/olavinlinna-yhdistetty-181g/Matkakirja3D.app` (valmis ~04.40; tarkista `Data/Raw/kaannos.txt` ja että käännös on todella uusin, Julkaisija ilmoittaa polun). EI 181 / 181b / 181d / 181f.
- Ohje (PT): sama kuin ensimmäisellä ja toisella kerralla: pelaa kuin uusi pelaaja, vain oikeilla kosketuksilla; Olavinlinna → Pelaa → vene → laituri → yritä edetä; jää kiinni kerran tahallaan ja yritä paeta tyrmästä. Ääni kaikilta kierroksilta komennolla `kaappaa <s> <nimi>` (EI `linssi kaappaa`).
- Painopiste (PT): (1) pääsetkö tyrmästä ulos ja etenemään linnaan (Siirtoseppä: v6:ssa ovi on herätessä oikealla kuvan ulkopuolella 38°, korjattu v7:ssä), (2) näkyykö vihjeen kipinä ruudulla, (3) kuuluuko tyrmä (v6: −31 dB), (4) varoitus ennen kiinniottoa (v6: 2 s, ei lyhtyä/puhe-elettä näkyvissä kun kamera kallistui lattiaan).
- Raporttiin vertailu kohtiin a–e: 1. ajo, uusinta (v4) ja 3. kierros (v6) → nyt v7 (korjattu / ennallaan / uusi). Raportti `docs/raportit/laitetestaaja-olavinlinna-nelja-20261011.md` (tai PT:n nimeämä) + kuva-arkki + rivi PT:lle + SIMU VAPAA Julkaisijalle.
- Aiemmat raportit (kaikki pushattu): `docs/raportit/laitetestaaja-olavinlinna-ensikerta-20261011.md` (v1), `…-uusinta-20261011.md` (v4/181d), `…-kolmas-20261011.md` (v6/181f), `laitetestaaja-karttakierros-180-20261011.md`. Kuvat ja lokit `proto-3d/lokit/laitetestaaja-*-20261011/`.

## Tulokset tähän mennessä (tiivis)
- v6: pako tapahtuu automaattisesti ("tyrmästä ulos 77 s:ssa"); Hälytys-tila lukitsee pannauksen ja silmukoi (Halytys↔Etsii); laiturilla eteenpäin kävely kallistaa kameran lattiaan; "Jatketaanko?" -dialogi ("Alusta" epäselvä); 10 min −inf dB hiljaisuus kartalla; vihje ei näy ruudulla; tyrmä −31 dB (parantunut).
- Karttakierros TF 180: 31/31 kohdekaupunkia OK paitsi Wien/Vilna/Luxemburg/Marseille (kysymysnapit eivät näy); maakortti puuttuu natiivikartalta.

## Työkalut (valmiina repossa)
`docs/raportit/laitetestaaja-pelaaja-tyokalut-20261011/` (`$SCRATCH` = työhakemisto, aseta):
- `ajo.env` (UDID `3622D89D-0C4E-4755-8B7A-AC36C8D3431C`, APP-polku vaihdettava), `alusta.sh` (boot, asennus, uusi peli Lontoo, käynnistys; **D-polku `peli-loki.txt`:n kansioon tulostuu rivillä `D=`**; k.sh hakee sen `simctl get_app_container … data` -komennolla), `k.sh` (ohjaus: `tv x y` / `vv x1 y1 x2 y2 dur` vaakakoordinaateilla 1376×1032, `tt <teksti>` napautus UI-puun tekstillä, `puu lista`, `kuva <nimi>` + automaattinen kuvan kierto, `komento <tiedosto> <teksti>`), `puu.py`, `suunta.py` (kuvan suunta punaisen konsolirivin sijainnista), `kaupunki.sh` (karttakierros), `sheet.py` / `arkki.py` (kuva-arkit kuvateksteillä).
- Kosketukset: `simkosketus` (kääntö `clang … proto-3d/Matkakirja-proto/tyokalut/todistusajo/simkosketus.m`). Vaakapaneeli → pysty: x = 1032 − y_vaaka, y = x_vaaka. Tatti (liike) vasen alakulma n. (44, 939) pystykoordinaatein = vaaka (939, 44→); katse = veto oikealla keskialueella.
- Käynnistyksen jälkeen: `peli-komento.txt` `aani mykistys` (varmista "mykistys päällä"), `linssi-komento.txt` `kehittaja 1`, `ui-komento.txt` `ui kierto vaaka` (linnan sulkeminen palauttaa pystyyn → aseta uudelleen). Olavinlinna: ☰ ei, vaan alapalkki LINSSIT → PELIT → Keskeneräiset → Olavinlinna.
- Linnassa: ☰ (oikea yläkulma 1348,38) → Vihje / Linnan historia / Äänet / Lähteet / Sulje linna. Linnan uudelleenavaus: v6:ssa "Jatketaanko?" -dialogi (Alusta / Jatka). Latauskesto 100–300 s.
- Ääni: `kaappaa 1200 nimi` (Unity-wav kirjoitetaan vasta lopussa, ei saa sammuttaa simua kesken; natiivi-wav tyhjä Olavinlinnassa); analyysi `ffmpeg … astats` 10 s RMS.
- Sudenkuopat: `sleep` ketjutettuna estetty → käytä `until`-silmukkaa; pitkät komennot (>400 s) menevät taustalle, lue `…/tasks/*.output`; ei `zsh -c`/eval; muut simut `simusarja.sh simctl list devices booted`.

## Kanavat
PT `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc`; Julkaisija `Julkaisija (Opus, high) [115a64]` (id voi vaihtua, `ListAgents`); viesti vain valmis erä/jumi/kysymys, ≤ 8 riviä; epäonnistuessa varakanava `mcp__ccd_session_mgmt__send_message`.
