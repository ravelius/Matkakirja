# Pulu CZE – raportti

- Vastauksia: vaihe 1 = 235 (47 kohtaa × 5), vaihe 2 = 452 (linkkitaso "Kerro lisää"), yhteensä 687.
- Kesto: noin 43 min (vaiheesta 0 pakettiin, ajan seinäkello).
- Agentit (Sonnet, effort low, enintään 2 rinnakkain): vaihe 1 10 erää, 2 korjausagenttia, vaihe 2 6 erää. Tokenit yhteensä noin 2,43 M (vaihe 1 noin 0,98 M, korjaukset noin 0,19 M, vaihe 2 noin 1,26 M).
- Tarkistus (tarkista-era.mjs): vaihe 1 aluksi 38 virhettä (erästä 4 puuttui 8 vastausta, 29 vastauksessa liian vähän [[käsitteitä]], 1 liian pitkä uusi kysymys 39.4) → korjattu; jäljellä 1 käsitemäärävirhe (20.2, jää omistajan säännön mukaan). Vaihe 2: 2 yhden käsitteen virhettä (111, 373), jätetty. tarkista-valmis.mjs: 1 virhe (V1 #96, 1 käsite, sama kuin 20.2), 2 varoitusta (Zlín/Yhdysvallat = Baťan oma historia; knedlíky/peruna = ei ulkomaan viittaus) – hyväksytty.
- Faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa; Päätoimittajan tehtäväksi.
- Paketti: pulu-esigenerointi/CZE/CZE.json (47 kohtaa); pulu-esigenerointi/maat.json päivitetty (vain CZE-rivi).
