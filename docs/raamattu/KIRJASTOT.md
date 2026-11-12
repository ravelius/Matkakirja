# KIRJASTOT · yhteiset osat (yksi rivi per kirjasto; ovi: node tools/kirjaa.mjs kortti KIRJASTOT <tiedosto>)

Uusi toteutus nimeää rivin, jota se jatkaa; valmis sisältää vanhan toteutuksen poiston.

| Nimi | Polku | Mitä tekee | Missä käytössä | Vastuu |
|---|---|---|---|---|
| kamera | Assets/Matkakirja/Linssit/Ydin/Kamera/ (Kameralaite, Seurantaohjaaja, Kamerajohtaja, Liikepohja, Kameratarkastus) + Assets/Matkakirja/Kartta/KameraKirjoittaja.cs | Kameran runko, ajurit (ohjaaja, seuraaja, ote), pehmennykset, radan tarkastus ja ainoa kirjoitus Unityn kameraan | Ohjaajan kautta: pallon ajot, LentoV3, museon lento, osoitus ja ovensuu, ISS-etsin. Runko ja seuraaja: juoksupeli (haara kameralaite/pala-2, kytkimen takana). Ohi: opas, linna ja seikkailu, aloituslento, juoksupelin vanha drone | PK |
