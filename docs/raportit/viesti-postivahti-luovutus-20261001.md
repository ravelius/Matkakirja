# Postivahdin luovutusraportti (1.10.2026 klo 08.0x, tilinvaihto — Päätoimittajan käsky)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md, tämä viesti ja docs/raportit/viesti-postivahti-aloitus.md. Tämä täydentää/korvaa `viesti-postivahti-luovutus-20260930.md`:n. Postikierto, ScheduleWakeup-ketju ja kaikki ajastukset on LOPETETTU tässä; aloita uusi kierto itse (15 min, 10 min jos levy < 45 Gi tai laskussa).

## Voimassa
- Hälytysrajat: levy < 45 Gi → Päätoimittajalle (posti-tiedosto jos SendMessage estyy), < 38 Gi → PushNotification käyttäjälle (ToolSearch select:PushNotification), kova raja 30; muisti < 25 % vapaa; sim päivällä (07–24) ≤1 booted; konteksti ≥ 60/70 %; viikkoraja 94/97 %; kävijälaskuri kerran tunnissa (ohje viesti-postivahti-aloitus.md); hook-tarkistus (#3734 auki).
- VIESTIRAJA: SendMessage pysähtyy ~10–16 viestiin käyttäjän viimeisestä viestistä. Varakanavaa (mcp send_message) EI ole käytetty, koska käyttäjä ei ole sallinut; hook ja Päätoimittaja ovat ehdottaneet sitä. Vain käyttäjä voi sallia. Estyessä: viesti docs/raportit/posti-postivahti-fable-20261001.md:hen + push.
- Session id:t ja kierron kaava: katso viesti-postivahti-luovutus-20260930.md (id:t voimassa; Päätoimittaja local_593b89a1-2514-4d74-b956-2a73db862382 on nollattu 1.10.).

## Tila 1.10. 07.5x
Levy 48 Gi (vakaa; ylitti 29 Gi pohjan 20.50 siivouksella), wt/ 31 (raja 20), muisti 79 % vapaa, kuorma rauhallinen. Viikkoraja 96 % (97 % ilmoitus tekemättä). Päätoimittaja 15 %. Kävijälaskuri 07.33: n=9 (30.9.: FI 1 + US 2; 1.10.: US 6; apurahakortti yht. 6; esittelylinssit 1). Viimeinen ilmoitus Päätoimittajalle posti-tiedostossa: 07.33. Viestirajan hook OK. Varmuuskopio-VIKA: ei uusia rivejä 10.52 jälkeen. Pariteettisääntö (omistaja 30.9.): ei muutoksia web/natiivi-eron perusteella ilman lupaa.
