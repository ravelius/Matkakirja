# Postivahdin luovutus (9.10.2026 klo 01.00, konteksti 78 %)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti ja `viesti-postivahti-aloitus.md`. Korvaa `viesti-postivahti-luovutus-20261007.md`:n. Kierto jatkuu: `ScheduleWakeup`, sentinel `<<autonomous-loop-dynamic>>`.

## Voimassa olevat rajat
- Viikkoraja (`get_usage`): uusi tili 8.10. alkaen, reset ti 13.10. klo 02.00; hälytys PÄÄTOIMITTAJALLE 96 % ja 99 %.
- 5 h ikkuna: hälytys PT:lle 70, 85, 95 % (arvioitu täyttymisaika mukaan); tauko 98 %:ssa (Raamattu). Reset klo 02.10 (9.10.), sitten 5 h välein.
- Levy: ilmoitus PT:lle < 38 Gi, kriittinen < 31 (kova 30); junan raja 36. Tavoite ennen TF-käännöstä > 45 Gi. Nyt ~117 Gi (sisäinen simusarja poistettu).
- Kierto: 5 min; talon tila (`/Users/Shared/Claude/Matkakirja-fable/scratchpad/talon-tila.json`) 10 min välein.
- Ei pushia omistajalle, kaikki rivit PT:lle.

## Talon tila -tehtävä (PT 8.10. klo 09.3x)
Päivitä vain kentät `paivitetty` (date +%H.%M), `roolit` (11 roolia, {nimi, teksti ≤ 110 merkkiä, tila työ|odottaa|lepo}), `tf`. Älä koske `junat`/`huom`. Kirjoita python3:lla .tmp → os.replace. `list_sessions` isRunning/lastActivityAt (≤ 15 min = työ). TF-rivi: tools/vienti/muutosloki-natiivi.json ensimmäinen rivi (gh api) — viimeksi 1.1 (165) testaajilla. Roolin ollessa levossa > 15 min eikä jonossa ole aloitettavaa (`scratchpad/tyojonot.md`): rivi PT:lle "LEPÄÄ: <rooli>, jono tyhjä".

## Päätoimittajan nollaus-siirto
list_events/get_usage(session_id) → konteksti < 10 % tai "ei prosessia" → send_message aloitusviesti PT:n antamalla tekstillä. Usein PT käynnistyy itse (konteksti ~11 % ja isRunning) → älä lähetä mitään. set_remote_control pois/päälle vain jos PT erikseen pyytää. notify_when_idle ei toimi tälle sessiotyypille.

## Roolien välitykset
PT pyytää välittämään sanatarkasti rooleille; kuittaus PT:lle yhdellä rivillä. Voimassa: -c/eval-kielto (ei zsh -c, bash -c, eval; JUMI → FABLE), T7-simusarja (source simusarja.sh), tauot 5 h rajan takia, juna 167 viivästetty (SHA:t Natiivisepälle 23.00 mennessä; TF ~23.30–24.00). Sessio-id:t: tilataulun ylin rivi 8.10. 07.2x (PÄÄTOIMITTAJA local_593b89a1…, Julkaisija local_22b29f10…, Natiiviseppä local_bf20055b…, Natiivi-UI local_33ba1387…, Pelikoodari local_97810d35…, Linssiseppä local_45a869de…, Linssiseppä 2 local_fc4fcc54…, Linnanrakentaja local_08e82dfc…, Siirtoseppä local_b50bb32e…, Karttaseppä local_37708e68…, Sisältökirjuri local_256f6a15…, Laitetestaaja local_c22294e5…).

## Tila 9.10. klo 00.57
5 h ikkuna 46 %, viikko 59 %, levy 116 Gi, wt/ 37, kuorma vaihtelee 13–150 (käännökset). Hiljainen ikkuna päättyi 00.09. Kaikki roolit käynnissä tai jonoa odottamassa.
