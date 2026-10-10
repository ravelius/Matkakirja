# Pulu LTU – raportti (pilviajo, haara pulu-ltu-pilvi)

- Vastauksia: vaihe 1 = 195 (39 kohtaa × 5), vaihe 2 = 408; yhteensä 603.
- Kesto: noin 37 min agenttiajon aloituksesta (vaihe 0 ei mukana).
- Agenttien tokenit yhteensä: noin 3,0 miljoonaa (Sonnet, effort low; 8 + 2 korjaus + 6 vaihe 2 -agenttia; arvio agenttien raportoimista käytöistä, noin 2,4–2,6 M + uudelleenajot).
- Tarkistus (tarkista-era.mjs): vaihe 1 aluksi 60 virhettä (59 käsitemäärää 0–1, 1 liian pitkä jatko, 1 ohjeviittaus) → kaikki korjattu, 0 jäljellä. Vaihe 2: 0 virhettä.
- tarkista-valmis.mjs: aluksi 2 virhettä (huutomerkki vastauksessa 39.5; "Perunille" tulkittiin Peruksi) → korjattu, 0 virhettä, 4 varoitusta (ulkomainen maininta, luettu silmin: Yhdysvallat/Darius ja Girėnas, Japani, Perun-jumala, Egypti; kaikki sisällöllisesti perusteltuja).
- Muut korjaukset: kysymys 10.2 (ei tietoa) korvattu; paikan 6.3 vuosi poistettu; suurimmuusväitteet "Euroopan suurin valtio/kosteikko" pehmennetty. Erä 1:n agentti jätti aluksi n.1–n.2 pois ja täydensi ne pyynnöstä.
- Faktat: vain karkea haku (suurin/ensimmäinen/vanhin) ja korjaukset yllä; täyttä 30 vastauksen pistokoetta ei tehty (jää Päätoimittajalle). Tunnetut epävarmat: Kretuonas 8,29 km², Kernavė "ensimmäinen pääkaupunki", paavin vierailu 1993.
- Paketti: pulu-esigenerointi/LTU/LTU.json (39 kohtaa, 195 kysymysvastausta, 408 linkkivastausta); maat.json päivitetty (vain LTU-rivi).
