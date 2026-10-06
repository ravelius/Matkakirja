# Postivahdin luovutusraportti (6.10.2026 klo 23.3x, tilinvaihto viikkoraja ~94 %)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti ja `viesti-postivahti-aloitus.md`. Tämä korvaa `viesti-postivahti-luovutus-20261005.md`:n. Kierto on jatkuva: `ScheduleWakeup`, sentinel `<<autonomous-loop-dynamic>>`.

## Voimassa olevat rajat
- Viikkoraja (`get_usage`, Weekly · all models): UUDEN TILIN RAJA KYSYTÄÄN OMISTAJALTA (Päätoimittajan kautta). Hälytykset PÄÄTOIMITTAJALLE 96 % ja 99 %. 99 %: heti, sitten luovutukset.
- Levy: Päätoimittajan 6.10. ohje: ilmoita vain jos < 38 Gi tai (kriittinen) < 31 / < 30 Gi; kova raja 30. Ei pushia omistajalle, kun PÄÄTOIMITTAJA on paikalla (omistajan linjaus). Muisti < 25 % vapaa → Päätoimittajalle.
- Odottavat roolit (ListAgents "waiting"): yksi rivi PÄÄTOIMITTAJALLE; ei PushNotificationia (omistaja 4.10.).
- wt/ yli 20 kansiota: maininta kun kasvaa. Roolit poistavat omat worktreensa itse (`tools/uusi-worktree.sh --poista`; proto-repon worktreet `git worktree remove`). Älä poista itse.
- Kävijälaskuri: Päätoimittaja 5.10. "erittelyä ei tarvita"; ei ajeta, ellei erikseen pyydetä.
- Roolien nimi: session nimi on nyt "PÄÄTOIMITTAJA (Opus, max)" (isoilla), id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. Muiden roolien nimet: "<Rooli> (Opus, high)", Sisältökirjuri ja Laitetestaaja "(Sonnet 5.5, high)".
- Hiljainen yö / kaikki idle: harvenna kierto 20–30 min; aktiivisen työn aikana 10–15 min; levyn ollessa kriittinen 2–5 min.

## PÄÄTOIMITTAJAN nollaus-siirto (toistunut 5.–6.10. useasti)
1. Päätoimittaja ilmoittaa nollauksestaan ja ajaa itse `clear_session("self")`. Postivahti EI voi tyhjentää toista sessiota (clear_session hylkää muut; Päätoimittaja on kiinnitetty).
2. Tilaa `SendMessage` `notify_when_idle: true` Päätoimittajalle ilman viestiä; odota idle-ilmoitus.
3. Tarkista `list_events(local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31)`: "0 viestiä" = tyhjä. Jos viestejä on yhä (konteksti `get_usage` > 50 %), lähetä "NOLLAUS EI TAPAHTUNUT ..." ja tilaa uusi idle-ilmoitus.
4. Kun tyhjä: `send_message` annetulla aloitusviestillä (Päätoimittaja antaa tekstin) ja `set_remote_control(id, true)`.
5. Älä kuittaa. Odota 70–90 s ennen tarkistusta (Bash `sleep` estetty; käytä taustaprosessia `timeout 100 bash -c 'sleep 90'` run_in_background).

## Roolien välitykset
Päätoimittaja pyytää välittämään sanatarkasti kaikille 11 roolille (Julkaisija, Natiiviseppä, Natiivi-UI, Pelikoodari, Linssiseppä, Linssiseppä 2, Siirtoseppä, Linnanrakentaja, Karttaseppä, Sisältökirjuri, Laitetestaaja). Kuittaa Päätoimittajalle yhdellä rivillä.

## Tila 6.10. 23.3x
Levy 43 Gi (vaihdellut 22–94 Gi; T7-siirto 6.10. 19.00 vapautti ~60 Gi), wt/ 26, viikkoraja ~94 %, roolit: ei jumeja. Työ: junat tarpeen mukaan (omistaja 6.10.), juna 152 työn alla. Appi suljetaan ~15 min tilinvaihdon jälkeen; uusi tili: viikko 0 %.
