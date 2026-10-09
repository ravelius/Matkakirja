# Pulu AUT: pilviajon raportti

- **Vastauksia:** vaihe 1: 265 (53 kohtaa × 5); vaihe 2 (linkkitaso "Kerro lisää"): 586 (8 erää). Yhteensä 851.
- **Kesto alusta loppuun:** noin 67 min (seinäkello, ennen raportin kirjoitusta).
- **Agenttien tokenit yhteensä (Agent-työkalun ilmoittamat):** 3 119 200
  - vaihe 1 (11 erää): 1 059 809
  - vaiheen 1 korjausagentit (2): 182 718
  - vaihe 2 (8 erää): 1 876 673
  - Kaikki agentit: Sonnet, effort low, enintään 2 rinnakkain. Opusta ei käytetty.
- **Tarkistuksen virheet:**
  - Vaihe 1, ensimmäinen koko ajo: 78 virhettä (käsitteitä 0–1 yhtä lukuun ottamatta; 42.2 käsitteessä pystyviiva). Kaikki korjattu kahdella korjausagentilla (lisättiin [[käsite]]-merkintöjä), lopputulos 0 virhettä. Korjausagentti B ajoi vahingossa agentin A apuskriptin (jaettu scratchpad); kohtien ≤25 tiedostot tarkistettiin eivätkä muuttuneet.
  - Vaihe 2: 10 virhettä (käsitteitä 0–1 yhdeksässä: 15, 45, 105, 139, 154, 312, 512, 530, 580; viittaus ohjeisiin 71 "ohjeisto"). Korjattu käsin, lopputulos 0 virhettä. Lisäksi tarkista-valmis löysi huutomerkin (557, "Oliver!"), korjattu. Vastaus 15 kirjoitettiin uusiksi (sisälsi epäilyttävän nimen "Leander Klotz" ja metalauseen "tässä"). Käsitemääräpoikkeuksia ei jätetty.
  - tarkista-valmis lopussa: 0 virhettä, 3 varoitusta (ulkomainen maininta: Yhdysvallat #237, Egypti #240 ja #241); luettu, kaikki sisällöllisesti perusteltuja (1873 pörssiromahdus, kirahvimuoti).
- **Huomioita:** vaiheen 2 käsin korjatut vastaukset (mm. 15, 154, 512) kannattaa silmäillä; faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa. Hahmotelma-kohteiden (esim. Hochkogel, Admont) vastauksissa on useita "en ole varma" -muotoiluja.
- **Paketti:** `pulu-esigenerointi/AUT/AUT.json` (53 kohtaa, 265 kysymysvastausta, 586 linkkivastausta). `pulu-esigenerointi/maat.json` päivitetty (AUT). Haara: `pulu-aut-pilvi`.
