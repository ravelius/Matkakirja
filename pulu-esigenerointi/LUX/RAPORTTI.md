# Pulu LUX: raportti (10.10.2026)

- Vastauksia: vaihe 1 = 80 (16 kohtaa × 5), vaihe 2 = 156; yhteensä 236.
- Kesto: noin 15 min (vaihe 0 mukaan lukien; ajettu 2 agenttia rinnakkain).
- Agenttien tokenit yhteensä: noin 952 700 (8 Sonnet-agenttia, effort low: vaihe 1 erät 4 kpl, linkkikorjaukset 2 kpl, vaihe 2 erät 2 kpl).
- Data: v625 oli poistunut ämpäristä (404), joten lataus ajettiin v651:llä (väliaikainen kopio lataa-data.sh:sta, työkalua ei muutettu). `fokuskohteet`/`maastokohteet` -paketteja ei LUX:lle ole.
- Tarkistus:
  - tarkista-era vaihe 1: aluksi 23 virhettä (käsitemäärä 0–1, erät 1–2), korjattu lisäämällä [[linkit]]; lopuksi 0 virhettä.
  - tarkista-era vaihe 2: 1 virhe jäljellä (#128 Rockhal, 1 käsite; sallittu yksittäinen käsitemäärävirhe).
  - tarkista-valmis: 0 virhettä, 3 varoitusta (Yhdysvallat Emma Kuhn -tarinassa Useldangessa, tarkistettu: kuuluu aineistoon).
- Faktojen pistokoetta (30 vastausta) ei ajettu; agentit raportoivat muistinvaraisiksi: Steichenin vuodet (V2 #6, #8), suurherttua Jean (#33), Carnot (#65), Luxemburgin liittäminen Ranskaan 1795 (#57), luxemburgin kielen asema 1984 (#74), Honorius II, Monnet, Ludvig XIV, Kaarle IV (erä 2-2). Tarkistettava ennen julkaisua.
- Paketti: pulu-esigenerointi/LUX/LUX.json (16 kohtaa, 80 + 156 vastausta); maat.json päivitetty (LUX-rivi).
