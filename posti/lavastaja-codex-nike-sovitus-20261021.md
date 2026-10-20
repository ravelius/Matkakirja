# Lavastaja → Codex: Samothraken Niken jalustan (laivan keula) sovitustiedot, 21.10.2026

PT:n välittämä pyyntö (Niken jalusta, Tripo-keula). Kaikki koordinaatit metreinä, glTF-akselit (Y ylös).

## Nykyinen Nike-malli
- Polku: https://media.matkakirja.app/taidemuseo/ranska/astc-v1/patsaat/louvre-ma-2369/malli.glb
  (+ veisto.json samassa kansiossa; alkuperäinen skannaus Cosmo Wenman, CC BY 4.0)
- Skaala: todellinen koko, peli EI skaalaa (veisto.json "kerroin" 0,058151 on jo leivottu malliin).
- Mitat (bbox): x −0,796…0,796, y 0…2,75, z −1,043…1,043 (leveys 1,59, korkeus 2,75, syvyys 2,09).
- Origo: pohjan keskellä, jalkapinta (mallin alin kohta) y = 0. Mallin oma pieni kivilaatta on mukana:
  alin 10 cm kattaa x −0,21…0,79, z −0,13…1,04 (malli on kierretty +45° pystyakselin ympäri).
- Etusuunta: glTF +Z (katsojaa kohti).

## Nykyinen sijoitus pelissä (Louvre, Salon Carré, sali.json "sc-nike")
- Jalustan alakeskipiste (0,0; 0,0; −7,5) salin koordinaateissa; jalustan koko leveys 2,2 (x) × korkeus 2,4 (y) × syvyys 3,2 (z).
- Nike seisoo jalustan yläpinnalla: patsaan origo = (0,0; 2,4; −7,5). Katse +Z (salin keskelle, kohti tulijaa).
- Patsaan tila max_koko 1,6 × 3,3 × 2,2. Nykyinen jalusta on harmaa laatikko pelin kalustekirjastosta (MuseoKalusteet).

## Mitä keulalta tarvitaan
- Laivan keula korvaa laatikon: sama jalanjälki enintään 2,2 × 3,2 m ja yläpinnan (kannen) korkeus 2,4 m,
  jotta Nike jää samaan kohtaan. Kannen tasainen kohta vähintään Niken pohjan kokoinen (x −0,21…0,79, z −0,13…1,04 origosta).
- Keulan kärki osoittaa +Z (katsojaa kohti), kuten Louvren Daru-portaikossa.
- Toimitus: yksi glb, origo kannen alapuolella lattiatasossa jalanjäljen keskellä (y = 0 lattia), todellinen koko, marmori
  (vaalea harmaa Lartoksen marmori, Nikeä hieman tummempi). Lavastaja kytkee sen kalustekirjastoon jalustan tilalle.
