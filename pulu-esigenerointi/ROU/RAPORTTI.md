# Pulu ROU (Romania): pilviajo 9.10.2026

- Vastauksia: vaihe 1 = 280 (56 kohtaa x 5), vaihe 2 = 657 (linkkitaso), yhteensä 937.
- Kesto: noin 75 min vaiheen 0 alusta (Sonnet, effort low, enintään 2 agenttia rinnakkain; vaihe 1: 12 erää, vaihe 2: 9 erää).
- Agenttien tokenit yhteensä: noin 3,39 milj. (vaihe 1 noin 1,22 milj., vaihe 2 noin 2,16 milj.).
- Tarkistukset:
  - tarkista-era.mjs: vaihe 1 ja vaihe 2, 0 virhettä lopuksi. Agentit korjasivat omia käsitemäärävirheitään (alle 2 [[käsitettä]]) ajon aikana, noin 30 vastausta, sekä yksi kelpaamaton jatkokysymys.
  - tarkista-valmis.mjs: 1 virhe (huutomerkki lainauksessa, vaiheen 2 Bukarest-vastaus), korjattu; lopuksi 0 virhettä.
  - Varoituksia 4 (ulkomaiset maininnat tavallisena tekstinä: Egyptin sfinksi, Yhdysvallat ja Peru/Perun-jumala Kiovan kastetapahtuman yhteydessä); luettu, kelvollisia.
  - Faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa: tehtävä Päätoimittajalle/erikseen.
- Paketti: pulu-esigenerointi/ROU/ROU.json (56 kohtaa, 280 + 657 vastausta); maat.json päivitetty (vain ROU-rivi).
