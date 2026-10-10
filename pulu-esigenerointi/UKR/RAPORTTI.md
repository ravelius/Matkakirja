# Pulu UKR: raportti

- Vastauksia: vaihe 1 = 195 (39 kohtaa × 5), vaihe 2 = 387 (linkkitaso "Kerro lisää"), yhteensä 582.
- Kesto: noin 47 min (vaihe 0 alusta pakettiin, ilman raportin kirjoitusta).
- Agentit: 13 Sonnet-agenttia (effort low), enintään 2 rinnakkain; tokenit yhteensä noin 2,08 milj. (vaihe 1: noin 0,80 milj., 8 erää; vaihe 2: noin 1,28 milj., 5 erää).
- Tarkistukset:
  - `tarkista-era.mjs` vaihe 1: 0 virhettä; vaihe 2: 0 virhettä. Agentit korjasivat itse noin 12 käsitemääräkorjausta (liian vähän [[käsitteitä]]).
  - `tarkista-valmis.mjs`: ensin 9 virhettä, kaikki korjattu → 0 virhettä, 6 varoitusta (Perun-maininnat 5 kpl ja "Egypti" yhdessä Konstantinopolin vastauksessa; luettu: Perun on slaavien jumala, [[linkit]] poistettu tavalliseksi tekstiksi).
    - Perun/Perunin-linkit (5 kpl): linkki poistettu.
    - Huutomerkki (2 kpl, Romanian ateneumin tunnuslause): huutomerkki poistettu lainauksesta.
    - Metalause "ohjeiden mukaan" (Myrhorod): sanamuoto vaihdettu.
    - Pieni kirjain lauseen alussa (Gootit): "jKr." → "jaa.".
- Faktojen pistokoetta (30 vastausta) EI ole tehty koneellisesti eikä silmin tässä ajossa; vaiheen 2 erän 4 agentti ilmoitti monen vastauksen perustuvan yleistietoon ja vuosilukujen olevan tarkistamatta lähteistä. Pistokoe jää Päätoimittajalle.
- Paketti: `pulu-esigenerointi/UKR/UKR.json` (39 kohtaa, 195 kysymysvastausta, 387 linkkivastausta); `pulu-esigenerointi/maat.json` päivitetty (vain UKR-rivi).
