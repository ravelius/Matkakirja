# Postivahdin luovutus (10.10.2026 klo 12.4x, tilinvaihto; oma konteksti on tiivistetty useasti)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti, `viesti-postivahti-aloitus.md` ja `KIERROS.md` (pysyvä kierros-ohje, sama tiedosto kuin tässä commitissa). Korvaa `viesti-postivahti-luovutus-20261009.md`:n.

## Kierros
- `ScheduleWakeup` ~4 min välein; prompt tasan: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".
- Joka kierroksella `get_usage` ilman id:tä (5 h ikkuna, viikko) ja `get_usage(session_id)` JOKAISELLE roolisessiolle, myös levossa oleville ja PT:lle ("unavailable" = ei prosessia, käytä viimeistä tunnettua arvoa). Levy `df -k /`, `ls /Users/Shared/Claude/wt | wc -l`.
- Kaikki viestit PT:lle (local_593b89a1-2514-4d74-b956-2a73db862382), suomeksi, yksi rivi. Ei pushia omistajalle. Hälytys vain kerran per raja.

## Voimassa olevat hälytysrajat
- Rooli: konteksti ≥ 50 % (uudelleen 65 %). PT: ≥ 65 % (uudelleen 80 %).
- 5 h ikkuna: 70, 85, 95 % (+ arvioitu täyttymisaika); tauko 98 %:ssa.
- Viikko: 96 % → yksi rivi PT:lle (ei siirtopromptipyyntöä); 99 % → vain rivi PT:lle.
- Levy: rivi PT:lle kun vapaa < 100 Gi ja kun taas > 100 Gi (omistajan raja). Nyt ~65 Gi, on ollut alle 100 Gi koko aamun (Unity-käännös pudotti ~35 Gi hetkellisesti).
- wt/-kansio: raja 20 kansiota (PT 11.2x). Nyt 24 (oli 30). Poistolistat lähetetty omistaville rooleille; epäselvä omistaja: siivous-kuvat-20261009.
- LEPÄÄ: rooli levossa > 15 min eikä jonossa aloitettavaa (`scratchpad/tyojonot.md` PT:n checkoutissa) → "LEPÄÄ: <rooli>, jono tyhjä". Oikeutetut levot: Laitetestaaja, Karttaseppä, Siirtoseppä, Linnanrakentaja, Sisältökirjuri.
- Talon tila 10 min välein (`/Users/Shared/Claude/Matkakirja-fable/scratchpad/talon-tila.json`): vain `paivitetty` ja `roolit`; älä koske `junat`/`huom`. Päivitysskripti oli istunnon scratchpadissa (`tila.py`); kirjoita uusi python3:lla .tmp → os.replace.

## Nollaus-siirto
PT hoitaa omien nollauskäskyjensä aloitusviestit ja RC:n. Kun PT pyytää välittämään PT:n nollauksen: `set_remote_control` pois, odota ~90 s, tarkista `list_events` (0 viestiä) tai `get_usage` ("unavailable"), lähetä PT:n antama aloitusviesti, `set_remote_control` päälle. Jos PT käynnistyi itse, älä lähetä mitään. Ei pudotusta 5 min jälkeen → "NOLLAUS PUTOSI". Älä lähetä aloitusviestejä rooleille, joiden nollauksen PT tekee itse.

## Resurssilinjaus
Kone vapaa ma 12.10. asti (2 simua, GUI sallittu, nice 15); ti 13.10. aamuksi GUI pois ja Unreal kiinni; levy yli 100 Gi.

## Sessio-id:t
PT local_593b89a1-2514-4d74-b956-2a73db862382 · Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97 · Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 · Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e · Linssiseppä 2 local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10 · Linnanrakentaja local_08e82dfc-ac27-4a27-a62b-b0ff862022ae · Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1 · Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 · Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 · Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531 · Sisältökirjuri local_256f6a15-b806-4259-97bd-b2ba8d342f86 · Laitetestaaja local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1

## Tila 10.10. klo 12.34 (viimeinen kierros)
5 h ikkuna 69 % (nollautuu 13.00), viikko 95 %, levy 65,7 Gi, wt 24.
Konteksti: PT 62, Karttaseppä 53, Pelikoodari 49, Sisältökirjuri 45, Linssiseppä 44, Linssiseppä 2 39, Linnanrakentaja 39, Siirtoseppä 38, Natiivi-UI 28, Natiiviseppä 12, Julkaisija 9; Laitetestaaja ei prosessia (lepo).
Hälytetty jo: Karttaseppä 50 % (12.26), PT-konteksti 65 % ei vielä. Seuraavaksi odotettavissa: 5 h 70 %, viikko 96 %, PT 65 % (PT nollaa itse 65 %:ssa).
