# Postivahdin luovutusraportti (7.10.2026 klo 23.3x, tilinvaihto keskiyöllä)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti ja `viesti-postivahti-aloitus.md`. Tämä korvaa `viesti-postivahti-luovutus-20261006.md`:n. Kierto on jatkuva: `ScheduleWakeup`, sentinel `<<autonomous-loop-dynamic>>`.

## Voimassa olevat rajat
- Viikkoraja (`get_usage`, Weekly · all models): uusi tili 7.10. alkaen, reset pe 9.10. klo 08.00. Omistajan vahvistama raja 99 %; Päätoimittajan ohje: hälytys PÄÄTOIMITTAJALLE 90 % (tehty 7.10. 23.28) ja 96–97 % (siirtoprompti, tilinvaihto). Tilinvaihdon jälkeen kysy uusi raja Päätoimittajalta.
- 5 h ikkuna: hälytys vain pyydettäessä (7.10. oli 85 %:n hälytys Sisältökirjurille, ei enää voimassa).
- Levy: ilmoita Päätoimittajalle vain jos < 38 Gi; kriittinen < 31 / < 30 Gi (kova raja 30). Syy yleensä käännöspalvelun välituotteet (proto-kaannos/Build/dd-sim, ~4,5 Gt per käännös); Julkaisija/Natiiviseppä siivoaa. Ei pushia omistajalle.
- wt/ 52+ kansiota: maininta vain jos Päätoimittaja kysyy; älä poista itse.
- Odottavat roolit: yksi rivi PÄÄTOIMITTAJALLE; ei PushNotificationia.
- Kierto: aktiivinen 15 min, hiljainen 20 min; levy < 45 Gi tai raja lähellä 5–10 min.

## Session id:t (7.10.)
Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe; Julkaisija local_5cb16c00; Natiiviseppä local_674b9ec4; Natiivi-UI local_44392b3c; Linssiseppä local_771b401b; Linssiseppä 2 local_c238f4af; Siirtoseppä local_86d0c984; Linnanrakentaja local_996d60ab; Karttaseppä local_eec7f158; Pelikoodari local_7fcab04b; Sisältökirjuri local_72d15713 ("jatkaminen"); Laitetestaaja local_af48ba1e. Hae uudet `list_sessions`illä tilinvaihdon jälkeen.

## Päätoimittajan nollaus-siirto (toistunut useasti 7.10.)
1. Päätoimittaja ilmoittaa nollauksestaan ja ajaa `clear_session self`. Tilaa `SendMessage` `notify_when_idle: true` (ilman viestiä); lepoilmoitus voi olla myös "exited".
2. Tarkista `list_events` ("0 viestiä") tai `get_usage(session_id)` (konteksti < 10 % tai "ei prosessia"). Jos ei tyhjä, älä lähetä mitään (Päätoimittaja antaa muuten ohjeen).
3. Lähetä Päätoimittajan antama aloitusviesti `send_message`lla ja `set_remote_control(id, true)`. Tarkista `get_session` → remoteControlState `on`.
4. Odotus: Bash `sleep` estetty → taustaprosessi `timeout 100 bash -c 'sleep 90'` run_in_background.

## Roolien välitykset
Päätoimittaja pyytää välittämään sanatarkasti kaikille 11 roolille. Kuittaus Päätoimittajalle yhdellä rivillä. Voimassa olevat linjaukset 7.10.: testaus kevyesti (vain automaattiset testit ennen junaa/TF:ää, ei Laitetestaajan rutiinia), käännökset harvemmin (roolit eivät tee omia käännöksiään, täysi käännös vain junalle/TF:lle), raskaita poltto/paisto-ajoja ei junakäännöksen aikana.

## Tila 7.10. 23.3x
Viikko 90 % (alkoi 2 %), 5 h ikkuna 28 %, levy 44 Gi, wt/ 52. **VAIHTO NYT** (omistaja 23.4x): tilinvaihto keskiyöllä; roolien luovutukset kerätään (kuittaus "luovutus pushattu <SHA>" Postivahdille); Päätoimittaja kokoaa yhden rivin. Mac käynnistettiin uudelleen 7.10. 11.40 (kierto jatkui).
