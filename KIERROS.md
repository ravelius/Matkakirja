# Postivahdin kierros (pysyvä ohje; PT 9.10.2026)

Kaikki viestit suomeksi, yksi rivi PT:lle (PÄÄTOIMITTAJA local_593b89a1-2514-4d74-b956-2a73db862382). Ei pushia omistajalle.
Kierros 4–5 min välein ScheduleWakeup, prompt: "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan".

## Joka kierroksella
1. `get_usage` (ilman id:tä): 5 h ikkuna ja viikko.
2. `list_sessions` (limit 14): isRunning, lastActivityAt.
3. `get_usage(session_id)` JOKAISELLE käynnissä olevalle roolisessiolle JA PÄÄTOIMITTAJALLE: konteksti %.
4. Levy: `df -h /`.
5. Talon tila 10 min välein (tiedosto /Users/Shared/Claude/Matkakirja-fable/scratchpad/talon-tila.json, kentät `paivitetty` (date +%H.%M) ja `roolit`; älä koske `junat`/`huom`). Kirjoita python3:lla .tmp → os.replace.

## Hälytysrajat (rivi PT:lle, kukin vain kerran per raja)
- Rooli konteksti ≥ 70 % (uudelleen 85 %). PT konteksti ≥ 65 % (uudelleen 80 %).
- 5 h ikkuna 70, 85, 95 % (+ arvioitu täyttymisaika); tauko 98 %:ssa.
- Viikko: 96 % → rivi PT:lle (EI siirtopromptipyyntöä; omistaja nollaa kiintiön 99 %:ssa); 99 % → vain rivi PT:lle.
- Levy < 50 Gi tai lasku > 1 Gi/min yli 5 min; < 38 Gi ilmoitus, < 31 kriittinen.
- LEPÄÄ: rooli levossa > 15 min eikä jonossa aloitettavaa (scratchpad/tyojonot.md Päätoimittajan checkoutissa) → "LEPÄÄ: <rooli>, jono tyhjä". Oikeutetut levot (Laitetestaaja, Karttaseppä, omistajaa odottavat) eivät hälytä.

## Työtilat
Kansiot /Users/Shared/Claude/ (wt/ ja Matkakirja-<rooli>); `tools/tarkista-tyotilat.sh` kierroksella tarvittaessa.

## Nollaus-siirto
PT konteksti < 10 % tai "ei prosessia" → send_message aloitusviesti PT:n antamalla tekstillä; jos PT käynnistyy itse, älä lähetä mitään.

## Roolien sessio-id:t
PT local_593b89a1-2514-4d74-b956-2a73db862382 · Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97 · Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 · Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 · Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 · Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e · Linssiseppä 2 local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10 · Linnanrakentaja local_08e82dfc-ac27-4a27-a62b-b0ff862022ae · Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1 · Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531 · Sisältökirjuri local_256f6a15-b806-4259-97bd-b2ba8d342f86 · Laitetestaaja local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1

## Levyn tilapäinen sääntö (PT 14.05)
Levyä 10 min välein; hälytä PT:lle vain jos vapaa < 45 Gi tai lasku > 1 Gi/min vielä 14.20 jälkeen (14.03 lasku oli swapia, dsymutil ja uudet Unity-worktreet).

## Levyn pysyvä raja (PT 15.20, omistaja; Raamattu LEVYJAKO)
Käynnistyslevyllä aina vähintään 100 Gi vapaana. Kirjoita PT:lle yksi rivi heti kun vapaa < 100 Gi. Korvaa aiemman 45 Gi:n ja 1 Gi/min -säännöt.

## Aloitusviestit (PT 17.2x)
PT hoitaa omien nollauskäskyjensä aloitusviestit ja RC:n (LS1, LS2, Siirtoseppä, LR, NUI); älä lähetä niitä. Ilmoita vain nollauksesta/RC:n puutteesta PT:lle tarvittaessa.
