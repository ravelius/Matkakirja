# Postivahdin luovutusraportti (2.10.2026 klo 22.1x, tilinvaihto 92 % — Päätoimittajan käsky)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti ja `viesti-postivahti-aloitus.md`. Tämä täydentää/korvaa `viesti-postivahti-luovutus-20261001.md`:n. Postikierto ja ScheduleWakeup-ketju on LOPETETTU tässä; aloita uusi kierto itse (10 min; 15 min kun levy ≥ 49 Gi ja rauhallista).

## Voimassa olevat rajat
- Levy < 45 Gi → Päätoimittajalle; < 38 Gi → PushNotification käyttäjälle (ToolSearch select:PushNotification); kova raja 30.
- Muisti < 25 % vapaa → Päätoimittajalle. Sim päivällä (07–24) ≤ 1 booted. wt/ yli 20 → maininta kun kasvaa.
- Viikkoraja (get_usage, Weekly · all models): UUDELLA TILILLÄ RAJA KYSYTÄÄN OMISTAJALTA (90 vai 97 %); vanhalla tilillä oli 92 % = valmistelu, 95 % = lopetus + push. Kunnes raja tiedossa: ilmoita Päätoimittajalle kun viikkoraja ylittää 80 % ja kysy rajaa.
- Kävijälaskuri kerran tunnissa (ohje `viesti-postivahti-aloitus.md`); kasvu → yksi rivi Päätoimittajalle.
- Hook-tarkistus: `bash tools/hooks/asenna-viestiraja-hook.sh --tarkista` (#3734 on mainissa).
- Irrotetut viennit (ppid 1: vie-delta.sh, vie-20261001-kerma-s2.sh, vie-viikonloppu-s2-maailma.sh) ovat tarkoituksella käynnissä, älä häiritse.
- Päätoimittajan nollaus-siirto: kun Päätoimittaja pyytää, odota että sessio local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc on levossa ja tyhjä (list_events 0 viestiä), lähetä send_message session_id:llä: "Olet Päätoimittaja (ent. Fable). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-fable-aloitus.md (haara claude/bold-ride-vow4ki) ja jatka. Kytke Remote Control päälle." + lukemat, sitten set_remote_control true. Tyhjennys ei onnistu kun RC on päällä (Päätoimittaja kytkee sen pois itse).
- VIESTIRAJA: SendMessage pysähtyy ~10–16 viestiin käyttäjän viimeisestä viestistä. Kiireiselle istunnolle SendMessage NIMELLÄ.

## Roolisessiot (nimet SendMessagea varten)
Päätoimittaja (Opus, max) local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc; Linssiseppä (Opus, high); Linssiseppä 2 (Opus, high); Pelikoodari (Opus, high); Natiivi-UI (Opus, high); Julkaisija (Opus, high); Siirtoseppä (Opus, high); Natiiviseppä (Opus, high); Laitetestaaja (Sonnet 5.5, high); Karttaseppä (Opus, high); Linnanrakentaja (Opus, high); Sisältökirjuri (Sonnet 5.5, high). Id:t: list_sessions.

## Tila 2.10. 22.1x
Levy 76 Gi (vaihtelee 45–98 Gi, laskee kun poltot/käännökset käynnissä; Päätoimittaja siivoaa worktreet), wt/ 31, muisti 69 % vapaa, kuorma vaihtelee (huiput 300–700 ohimeneviä), sim 0–1. Viikkoraja 92 % (22.06) — tilinvaihto käynnissä. Kävijälaskuri 21.39: ulkopuolisia 24 (2.10.: 10 kävijää, web 1 / ios 9, apurahakortti 5). Viimeinen levyhälytys Päätoimittajalle 20.39 (45 Gi).
Kuitatut luovutukset 92 %-ohjeeseen 22.1x: Laitetestaaja (8f3d5e0a0), Linssiseppä 2 (2f73d8a01), Natiivi-UI (050f7ba6); muut vielä kuittaamatta.

## Muistettavaa
- Käyttäjä kysyi 2.10. klo 15.30 TestFlight-latausmääristä. Kävijälaskuri EI laske TestFlight-asennuksia. ASC-avaimet ovat GitHub Actions -secreteissä (ei koneella); lukeminen vaatisi uuden työnkulun (ei vahdin tehtävä) — kysymys välitetty Päätoimittajalle 15.44 ja 19.55; vastausta ei nähty.
- Älä koskaan tulosta avaimia. UI-pohjasääntö (omistaja 1.10.) ja pariteettisääntö (30.9.) liitetään kierroksen aloitusviestipohjiin.
