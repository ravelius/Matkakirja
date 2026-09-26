# Build 23 (26.9.2026, käännös 7533a651, juna/b13 1356e216)

iPhone yksin, console-pty-kaappauksella koko ajan (opittu edellisistä: pkill vältetty, `simctl terminate`
lopuksi). Asennusrekisteri desyncasi taas kerran käynnistyksessä — korjattu tutulla uninstall+install-
kaavalla tuoreesta `Matkakirja-proto-kaannos`-buildista.

## Tulokset

- **166 (nappulan jalka kaupungin pisteen päällä kallistettuna, Pariisi): PASS.** `nappula aseta 48.86 2.35`
  + `kallista 60`: punaisen nappulan kärki osui tarkalleen pienen kaupunkimerkin päälle, ei sivuttaissiirtymää.
- **163b (kiirejono): PASS.** `valmius tila` → "...palvelin ... nälkä163b 0 ...". Ei yhtään "VARTIJA 163b"
  -riviä koko session ajalta konsolikaappauksessa — ei havaittuja yli 2 s -odotuksia kiirejonon takia.
  HUOM: en saanut aikaan aitoa verkkoruuhkaa testatakseni todellista stressiä, joten tämä on "ei ongelmia
  perustilanteessa" -todiste, ei kuormatesti.
- **Karuselli (Kööpenhamina, `elava elementit tila`): PASS silmämääräisesti.** Loki: "elävät elementit:
  päällä; myllyt ei näkyvissä, 220 kolmiota; karuselli ei näkyvissä, 1245 kolmiota; liike 1,00, kerros
  Taysi". Kamera Tivoliin: karuselli-3D-malli (raidallinen katos) näkyy oikeassa paikassa. Ei havaittua
  pyörimistä kahden peräkkäisen kuvan välillä — todennäköisesti sama joutosyke-jäädytys kuin lipulla
  (asettuu levossa), ei virhe.
- **Regressiot C, D, 165: PASS.**

## Ei ehditty (toistuu b22:sta)

Myllyt (Amsterdam, samalla elävät elementit -järjestelmällä — todettiin lokista rekisteröidyksi mutta ei
katsottu visuaalisesti), 164 (nimiöt/pisteet kalusteiden alta), aloitusverho (esilataus ≥ 80 %).

## Yhteenveto
166, 163b (perustaso), karuselli, C, D, 165 kaikki PASS. Myllyt/164/aloitusverho yhä auki — kolmas kierros
peräkkäin jossa nämä jäävät; suosittelen niille omaa lyhyttä kierrostaan jos B23 menee läpi näin. Simulaattori
sammutettu turvallisesti (terminate + shutdown, ei pkill).
