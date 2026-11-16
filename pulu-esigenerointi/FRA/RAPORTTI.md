# Pulu FRA: pilviajon raportti

- **Vastauksia:** vaihe 1: 295 (59 kohtaa × 5); vaihe 2 (linkkitaso "Kerro lisää"): 660 (9 erää). Yhteensä 955.
- **Kesto alusta loppuun:** noin 40 min (mitattu seinäkellolla 2 382 s ennen paketin kokoamista).
- **Agenttien tokenit yhteensä (Agent-työkalun ilmoittamat):** 3 098 183
  - vaihe 1 (12 erää): 1 179 934
  - vaiheen 1 korjausagentit (3): 210 303
  - vaihe 2 (9 erää): 1 707 946
  - Kaikki agentit: Sonnet, effort low, enintään 3 rinnakkain.
- **Tarkistuksen virheet:**
  - Vaihe 1, ensimmäinen koko ajo: 23 virhettä: käsitteitä liian vähän 8.2, 17.4, 18.3, 20.2, 29.2, 33.4, 34.5, 35.2, 36.1, 36.2, 36.4, 36.5, 37.3, 38.1, 38.2, 40.2, 40.4, 59.1; jatkokysymys liian pitkä 39.2; viittaus ohjeisiin 42.5; puuttuvat 56.3–56.5. Kaikki korjattu (kolme korjausagenttia), lopputulos 0 virhettä.
  - Vaihe 2: erien omissa tarkistusajoissa 28 virhettä (lähinnä vain yksi [[käsite]]; yksi liian pitkä jatkokysymys, yksi piilotettu tavutusmerkki), kaikki korjattu. Lopputulos 0 virhettä.
  - Käsitemääräpoikkeuksia ei jätetty.
- **Huomioita:** agentit merkitsivät vastauksiin muistinvaraisia faktoja, jotka kannattaa silmäillä ennen julkaisua (mm. 38.1, 4.1 Vignemalen raja, Aneto, vuosiluvut). PAIKKA-rivejä on vain muutamassa vaiheen 1 vastauksessa (koordinaatit muistista).
- **Paketti:** `pulu-esigenerointi/FRA/FRA.json` (59 kohtaa, 295 kysymysvastausta, 660 linkkivastausta). Haara: `pulu-ranska-pilvi`.
